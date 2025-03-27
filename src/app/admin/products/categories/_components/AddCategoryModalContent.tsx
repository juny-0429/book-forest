'use client';

import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import Select from 'src/components/Select/Select';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';

export default function AddCategoryModalContent() {
  const [categoryType, setCategoryType] = useState<'TOP' | 'SUB' | null>(null);
  const categoryTypeOptions: SelectOption[] = [
    { value: 'TOP', label: '대분류' },
    { value: 'SUB', label: '중분류' },
  ];

  const parentCategoryOptions: SelectOption[] = [
    { value: 'NOVEL', label: '소설' },
    { value: 'HEALTH', label: '건강' },
    // TODO: 실제 대분류 목록을 API에서 불러오도록 개선
  ];

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-title-24r'>카테고리 추가</h2>

      <form>
        <div className='flex flex-col gap-2'>
          <label className='flex items-center'>
            <span className='w-[150px] text-body-18b text-ui-text-title'>분류</span>
            <Select options={categoryTypeOptions} placeholder='분류를 선택하세요' className='w-full' onChange={(option) => setCategoryType(option?.value as 'TOP' | 'SUB')} />
          </label>

          {categoryType === 'SUB' && (
            <label className='flex items-center'>
              <span className='w-[150px] text-body-18b text-ui-text-title'>대분류 선택</span>
              <Select options={parentCategoryOptions} placeholder='대분류를 선택하세요' className='w-full' />
            </label>
          )}

          <label className='flex items-center'>
            <span className='w-[150px] text-body-18b text-ui-text-title'>카테고리명</span>
            <TextInput placeholder='카테고리명을 입력하세요.' />
          </label>

          <label className='flex items-center'>
            <span className='w-[150px] text-body-18b text-ui-text-title'>카테고리코드</span>
            <TextInput placeholder='카테고리코드를 입력하세요.' />
          </label>

          <Button height={48}>추가하기</Button>
        </div>
      </form>
    </div>
  );
}
