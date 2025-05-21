import { useState, useEffect } from 'react';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';

const supabase = supabaseBrowser;
const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_BANNER_BUCKET!;

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB 제한
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // 허용된 이미지 확장자

export const useBannerUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null); // 업로드된 파일 경로 저장

  const onImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return alert('파일을 선택해주세요.');
    if (file.size > MAX_FILE_SIZE) return alert('파일 크기가 너무 큽니다. (최대 50MB)');
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return alert('이미지 파일만 업로드할 수 있습니다.');

    const fileExt = file.name.split('.').pop();
    const originalName = file.name.replace(`.${fileExt}`, ''); // 확장자를 제외한 원본 파일명
    const fileName = `${originalName}-${Date.now()}.${fileExt}`; // 기존 파일명 + 날짜 추가
    const filePath = fileName;

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);

    if (error) return alert('파일 업로드에 실패했습니다.');

    const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const uploadedImageUrl = publicUrlData.publicUrl;

    setImageUrl(uploadedImageUrl);
    setFilePath(filePath);
  };

  const deleteImage = async () => {
    if (!filePath) return console.warn('삭제할 파일 경로가 없습니다.');

    const cleanedFilePath = filePath.replace(/^\/+/, '');

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([cleanedFilePath]);

    if (error) return console.error('파일 삭제 실패:', error);

    setImageUrl(null);
    setFilePath(null);
  };

  useEffect(() => {
    return () => {
      deleteImage();
    };
  }, [deleteImage]);

  return { onImageUpload, deleteImage, imageUrl };
};
