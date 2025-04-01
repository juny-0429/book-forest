'use client';

import React from 'react';

export default function ProductImageSection() {
  return (
    <section className='flex flex-col gap-6'>
      <div className='flex items-center gap-1'>
        <span className='w-[100px] flex-shrink-0 text-body-18m text-nowrap'>대표 이미지</span>

        <label htmlFor='thumbnail' className='w-[80px] h-[80px] border-2 border-solid border-gray-400 rounded-[8px] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200'>
          <span className='text-4xl text-gray-400'>+</span>
          <input id='thumbnail' type='file' accept='image/*' className='hidden' />
        </label>
      </div>

      <div className='flex items-center gap-1'>
        <span className='w-[100px] flex-shrink-0 text-body-18m text-nowrap'>상세 이미지</span>

        <label htmlFor='thumbnail' className='w-[80px] h-[80px] border-2 border-solid border-gray-400 rounded-[8px] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200'>
          <span className='text-4xl text-gray-400'>+</span>
          <input id='thumbnail' type='file' accept='image/*' className='hidden' />
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
