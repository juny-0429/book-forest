'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import { useProductImageUpload } from '../_hooks/useProductImageUpload';

export default function ProductImageSection() {
  const { setValue, register } = useFormContext();
  const { mainImageUrls, detailImageUrls, uploadImages, removeImage } = useProductImageUpload();

  const onMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const result = await uploadImages(Array.from(files), 'main');
    if (result.success) setValue('mainImageUrls', result.urls);
  };

  const onDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const result = await uploadImages(Array.from(files), 'detail');
    if (result.success) setValue('detailImageUrls', result.urls);
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

        {mainImageUrls.length > 0 && (
          <div className='flex items-center gap-2 ml-6'>
            {mainImageUrls.map((url, index) => (
              <div key={index} className='relative w-[150px] h-[150px] border border-solid border-gray-400 rounded-[4px] overflow-hidden'>
                <Image src={url} width={150} height={150} alt='product main preview image' />

                <button type='button' onClick={() => removeImage(url, 'main')} className='absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm'>
                  <LucideIcons.X size={12} className='text-gray-800' />
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
          <input id='thumbnail' multiple type='file' accept='image/*' onChange={onDetailImageUpload} className='hidden' />
          <input type='hidden' {...register('detailImageUrls')} />
        </label>

        {detailImageUrls.length > 0 && (
          <div className='flex items-center gap-2 ml-6 overflow-x-auto max-w-full'>
            {detailImageUrls.map((detailUrl, detailIndex) => (
              <div key={detailIndex} className='relative w-[150px] h-auto border border-solid border-gray-400 rounded-[4px] overflow-hidden'>
                <Image src={detailUrl} width={150} height={0} sizes='100vw' className='w-[150px] h-auto object-contain' alt='product detail preview image' />

                <button type='button' onClick={() => removeImage(detailUrl, 'detail')} className='absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm'>
                  <LucideIcons.X size={12} className='text-gray-800' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ul className='list-disc pl-5 text-body-14l text-ui-text-description'>
        <li>대표 이미지는 최대 5장까지 등록할 수 있습니다.</li>
        <li>대표 이미지 권장 사이즈는 최소 500 * 500 입니다.</li>
        <li>대표 이미지 최대 사이즈는 5MB 입니다.</li>
        <li>상세 이미지는 최대 20장까지 등록할 수 있습니다.</li>
        <li>상세이미지 가로 사이즈는 최소 1200px를 지켜주세요.</li>
      </ul>
    </section>
  );
}
