import { useState } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'post';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const usePostImageUpload = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const uploadImage = async (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert(`${file.name}은 지원하지 않는 이미지 형식입니다.`);
      return { success: false, url: '' };
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`${file.name}은 10MB를 초과합니다.`);
      return { success: false, url: '' };
    }

    const ext = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${ext}`;
    const filePath = `content/${fileName}`;

    const { error } = await supabaseBrowser.storage.from(BUCKET_NAME).upload(filePath, file, {
      upsert: false,
    });

    if (error) {
      alert(`${file.name} 업로드에 실패했습니다.`);
      return { success: false, url: '' };
    }

    const { data } = supabaseBrowser.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const uploadedUrl = data.publicUrl;

    setImageUrls([uploadedUrl]);

    return {
      success: true,
      url: uploadedUrl,
    };
  };

  const getPathFromUrl = (url: string) => {
    const { pathname } = new URL(url);
    const prefix = `/storage/v1/object/public/${BUCKET_NAME}/`;
    return decodeURIComponent(pathname.replace(prefix, ''));
  };

  const removeImage = async (url: string) => {
    const path = getPathFromUrl(url);

    const { error } = await supabaseBrowser.storage.from(BUCKET_NAME).remove([path]);
    if (error) {
      alert('이미지 삭제에 실패했습니다.');
      return;
    }

    setImageUrls((prev) => prev.filter((item) => item !== url));
  };

  return {
    imageUrls,
    uploadImage,
    removeImage,
  };
};
