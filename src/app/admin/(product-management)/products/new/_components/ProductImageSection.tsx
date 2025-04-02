'use client';

import React from 'react';
import { useProductMainUpload } from '../_hooks/useProductMainUpload';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';

export default function ProductImageSection() {
  const { setValue, register } = useFormContext();
  const { uploadFiles, previewUrls, removeImage } = useProductMainUpload();

  const onMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const result = await uploadFiles(Array.from(files));
    if (result.success) {
      console.log('업로드된 대표 이미지 주소들:', result.urls);
      setValue('mainImageUrls', result.urls);
    }
  };

  return (
    <section className='flex flex-col gap-6'>
      <div className='flex items-center gap-1'>
        <span className='w-[100px] flex-shrink-0 text-body-18m text-nowrap'>대표 이미지</span>

        <label htmlFor='main-thumbnail' className='w-[80px] h-[80px] border-2 border-solid border-gray-400 rounded-[8px] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200'>
          <span className='text-4xl text-gray-400'>+</span>
          <input id='main-thumbnail' multiple type='file' accept='image/*' onChange={onMainImageUpload} className='hidden' />
          <input type='hidden' {...register('mainImageUrls')} />
        </label>
        {previewUrls && (
          <div className='flex items-center gap-2 ml-6'>
            {previewUrls.map((mainImage, index) => (
              <div key={index} className='relative w-[150px] h-[150px] border border-solid border-gray-400 rounded-[4px] overflow-hidden'>
                <Image src={mainImage} width={150} height={150} alt='product main image' />

                <button
                  type="button"
                  onClick={() => removeImage(mainImage)}
                  className="absolute top-1 right-1"
                >
                  <LucideIcons.X size={20} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='flex items-center gap-1'>
        <span className='w-[100px] flex-shrink-0 text-body-18m text-nowrap'>상세 이미지</span>

        <label htmlFor='thumbnail' className='w-[80px] h-[80px] border-2 border-solid border-gray-400 rounded-[8px] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200'>
          <span className='text-4xl text-gray-400'>+</span>
          <input id='thumbnail' type='file' multiple accept='image/*' className='hidden' />
        </label>
      </div>

      <ul className='list-disc pl-5 text-body-14l text-ui-text-description'>
        <li>대표 이미지는 최대 5장까지 등록할 수 있습니다.</li>
        <li>대표 이미지 권장 사이즈는 최소 500 * 500 입니다.</li>
        <li>대표 이미지 최대 사이즈는 5MB 입니다.</li>
        <li>상세이미지는 1장만 등록할 수 있습니다.</li>
        <li>상세이미지 가로 사이즈는 최소 1200px를 지켜주세요</li>
      </ul>
    </section>
  );
}
