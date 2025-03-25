'use client';

import React, { useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import Button from 'src/components/Button/Button';
import { v4 as uuidv4 } from 'uuid';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { useUpdateUserProfile } from '../_hooks/react-query/useUpdateUserProfile';
import { useCustomModal } from 'src/hooks/useModal';

const supabase = supabaseBrowser;
const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_USER_BUCKET!;

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export default function UserProfileCropContent() {
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 업로드된 이미지
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 크롭 위치
  const [zoom, setZoom] = useState(1); // 확대/축소 비율
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null); // 크롭 영역(px)
  const [profileUrl, setProfileUrl] = useState<string | null>(null); // 최종 이미지 URL

  const { closeCustomModal } = useCustomModal();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateUserProfile } = useUpdateUserProfile();

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) return alert('파일 크기가 너무 큽니다. (최대 50MB)');
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return alert('이미지 파일만 업로드할 수 있습니다.');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height, x, y } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

      canvas.toBlob(async (blob) => {
        if (!blob) return alert('이미지 자르기에 실패했습니다.');

        const fileName = `${uuidv4()}.jpeg`;

        const { error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, blob, {
          contentType: 'image/jpeg',
        });

        if (error) return alert('업로드에 실패했습니다.');

        const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
        const uploadedImageUrl = publicUrlData?.publicUrl;

        if (!uploadedImageUrl) return alert('URL 가져오기에 실패했습니다.');

        setProfileUrl(uploadedImageUrl);
      }, 'image/jpeg');
    };
  };

  useEffect(() => {
    if (profileUrl) {
      updateUserProfile(profileUrl, {
        onSuccess: () => {
          closeCustomModal();
        },
      });
    }
  }, [profileUrl, updateUserProfile]);
  return (
    <div className='flex flex-col gap-2 pt-5'>
      <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={handleFileChange} />

      <Button onClick={openFileDialog} color='gray' height={48}>
        파일 선택
      </Button>

      {imageSrc && (
        <>
          <div className='relative flex-1 min-h-[400px]'>
            <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} cropShape='round' onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-body-16m text-ui-text-title whitespace-nowrap'>Zoom : </span>
            <input type='range' min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className='w-full' />
          </div>

          <Button onClick={showCroppedImage} height={40}>
            이미지 업로드 하기
          </Button>
        </>
      )}
    </div>
  );
}
