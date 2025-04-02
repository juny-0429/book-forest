import { useState } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_PRODUCT_BUCKET!;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const useProductMainUpload = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const uploadFiles = async (files: File[]) => {
    if (files.length < 1 || files.length > 5) {
      alert('대표 이미지는 1~5장까지 업로드할 수 있습니다.');
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
      const filePath = `main/${fileName}`;

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
      setPreviewUrls(uploadedUrls);
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

  const removeImage = async (url: string) => {
    const path = getPathFromUrl(url); // ✅ 안전한 path 추출

    const { error } = await supabaseBrowser.storage.from(BUCKET_NAME).remove([path]);
    if (error) {
      alert('이미지 삭제에 실패했습니다.');
      return;
    }

    setPreviewUrls((prev) => prev.filter((item) => item !== url));
  };

  return {
    uploadFiles,
    previewUrls,
    removeImage,
  };
};
