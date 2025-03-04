'use client';

import React from 'react';
import Select from 'src/components/Select/Select';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';

export default function AddBannerModalContent() {
  const options: SelectOption[] = [
    { value: 'option1', label: '메인베너' },
    { value: 'option2', label: '사이드배너' },
    { value: 'option3', label: '더블배너' },
    { value: 'option3', label: '트리플배너' },
    { value: 'option3', label: '카테고리배너' },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-title-24b text-ui-text-title'>배너 등록</h2>

      <form className='flex flex-col gap-2'>
        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>카테고리</span>
          <Select options={options} placeholder='카테고리를 선택하세요.' className='w-full' />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너명</span>
          <TextInput placeholder='배너명을 입력하세요.' />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너 링크</span>
          <TextInput placeholder='배너와 연결할 주소를 입력하세요.' />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>이미지 첨부</span>
          <TextInput type='file' />
        </label>
      </form>

      <div>
        <p className='text-body-16b text-ui-text-description'>배너 사이즈 안내</p>

        <ul className='mt-2 space-y-1 text-body-14r text-ui-text-description'>
          <li>📌 메인 배너 - 1200px × 300px</li>
          <li>📌 사이드 배너 - 300px × 600px</li>
          <li>📌 더블 배너 - 600px × 300px (2개 배치)</li>
          <li>📌 트리플 배너 - 400px × 300px (3개 배치)</li>
          <li>📌 카테고리 이벤트 배너 - 1000px × 250px (롤링 배너)</li>
        </ul>
      </div>
    </div>
  );
}
