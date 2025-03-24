import { useState } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { v4 as uuidv4 } from 'uuid';

const supabase = supabaseBrowser;
const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_USER_BUCKET!;

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB 제한
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // 허용된 이미지 확장자

export const useProfileUpload = () => {
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const handleProfileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return alert('파일을 선택해주세요.');
    if (file.size > MAX_FILE_SIZE) return alert('파일 크기가 너무 큽니다. (최대 50MB)');
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return alert('이미지 파일만 업로드할 수 있습니다.');

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);

    if (error) return alert('파일 업로드에 실패했습니다.');

    const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    const uploadedImageUrl = publicUrlData.publicUrl;

    setProfileUrl(uploadedImageUrl);
  };

  return { handleProfileUpload, profileUrl };
};
