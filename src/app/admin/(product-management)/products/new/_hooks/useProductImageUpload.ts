import { useState } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_PRODUCT_BUCKET!;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const useProductImageUpload = () => {
  const [mainImageUrls, setMainImageUrls] = useState<string[]>([]);
  const [detailImageUrls, setDetailImageUrls] = useState<string[]>([]);

  const uploadImages = async (files: File[], type: 'main' | 'detail') => {
    const maxCount = type === 'main' ? 5 : 20;
    const currentUrls = type === 'main' ? mainImageUrls : detailImageUrls;

    if (files.length < 1 || currentUrls.length + files.length > maxCount) {
      alert(`${type === 'main' ? '대표' : '상세'} 이미지는 최대 ${maxCount}장까지 업로드할 수 있습니다.`);
      return { success: false, urls: [] };
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert(`${file.name}은 지원하지 않는 이미지 형식입니다.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name}은 10MB를 초과합니다.`);
        continue;
      }

      const ext = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${ext}`;
      const filePath = `${type}/${fileName}`;

      const { error } = await supabaseBrowser.storage.from(BUCKET_NAME).upload(filePath, file, {
        upsert: false,
      });

      if (error) {
        alert(`${file.name} 업로드에 실패했습니다.`);
        continue;
      }

      const { data: publicUrlData } = supabaseBrowser.storage.from(BUCKET_NAME).getPublicUrl(filePath);
      uploadedUrls.push(publicUrlData.publicUrl);
    }

    if (uploadedUrls.length > 0) {
      const newUrls = [...currentUrls, ...uploadedUrls];
      if (type === 'main') setMainImageUrls(newUrls);
      else setDetailImageUrls(newUrls);
    }

    return {
      success: uploadedUrls.length > 0,
      urls: uploadedUrls,
    };
  };

  const getPathFromUrl = (url: string) => {
    const { pathname } = new URL(url);
    const prefix = `/storage/v1/object/public/${BUCKET_NAME}/`;
    return decodeURIComponent(pathname.replace(prefix, ''));
  };

  const removeImage = async (url: string, type: 'main' | 'detail') => {
    const path = getPathFromUrl(url);

    const { error } = await supabaseBrowser.storage.from(BUCKET_NAME).remove([path]);
    if (error) {
      alert('이미지 삭제에 실패했습니다.');
      return;
    }

    if (type === 'main') {
      setMainImageUrls((prev) => prev.filter((item) => item !== url));
    } else {
      setDetailImageUrls((prev) => prev.filter((item) => item !== url));
    }
  };

  return {
    mainImageUrls,
    detailImageUrls,
    uploadImages,
    removeImage,
  };
};
