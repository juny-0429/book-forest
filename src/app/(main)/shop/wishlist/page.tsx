'use client';

import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import Select from 'src/components/Select/Select';
import LucideIcons from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';

export default function wishlist() {
  const options: SelectOption[] = [
    { value: 'option1', label: '찜하기 추가순' },
    { value: 'option2', label: '제목순' },
    { value: 'option3', label: '출판일순' },
  ];

  return (
    <div className='w-full'>
      <h2 className='text-title-24b text-ui-text-title'>찜하기 목록</h2>

      <div className='flex flex-col gap-3 '>
        <div className='flex justify-between items-center'>
          <CheckBox>모두선택</CheckBox>

          <div className='flex justify-center items-center gap-1 w-fit'>
            <LineButton height={40} color='gray'>
              <LucideIcons.ShoppingCart size={20} className='text-gray-900' />
              카트담기
            </LineButton>
            <LineButton height={40} color='gray'>
              <LucideIcons.Trash2 size={20} className='text-gray-900' />
              삭제
            </LineButton>
          </div>
        </div>

        <hr className='w-full h-[1px] bg-gray-300' />

        <div className='flex justify-between items-center'>
          <p className='text-body-16r text-ui-text-title'>총 25개의 상품이 있습니다.</p>

          <div className='flex justify-center items-center gap-3'>
            <Select options={options} placeholder='옵션을 선택하세요' />
            <button>
              <LucideIcons.Grid2X2 size={30} />
            </button>
            <button>
              <LucideIcons.Menu size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
