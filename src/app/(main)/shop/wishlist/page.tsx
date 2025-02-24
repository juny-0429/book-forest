'use client';

import React, { useState } from 'react';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import Select from 'src/components/Select/Select';
import LucideIcons from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';
import { StaticImageData } from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import WishlistGridList from './_components/WishlistGridList';
import WishlistRowList from './_components/WishlistRowList';
import { cn } from 'src/lib/utils';

export interface WishlistItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  discount: number;
  bookImage: string | StaticImageData;
  publishedAt: string;
  description: string;
}

// todo: 인피니티 스크롤 적용하기
export default function wishlist() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const options: SelectOption[] = [
    { value: 'option1', label: '찜하기 추가순' },
    { value: 'option2', label: '제목순' },
    { value: 'option3', label: '출판일순' },
  ];

  const mockWishList: WishlistItem[] = Array.from({ length: 40 }, (_, index) => ({
    id: `${index + 1}`,
    title: '새 마음으로',
    author: '이슬아',
    publisher: '헤엄',
    price: 15000,
    discount: 10,
    publishedAt: '2025-02-25T14:30:00Z',
    description: '바로 지금, 한국문학의 가장 뜨거운 신인 2024 젊은작가상 수상 작가 김기태 첫 소설집',
    bookImage: SampleBookImg,
  }));

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

            <button onClick={() => setViewType('grid')}>
              <LucideIcons.Grid2X2 size={30} className={cn(viewType === 'grid' ? 'text-gray-900' : 'text-gray-600')} />
            </button>
            <button onClick={() => setViewType('list')}>
              <LucideIcons.Menu size={30} className={cn(viewType === 'list' ? 'text-gray-900' : 'text-gray-600')} />
            </button>
          </div>
        </div>

        {viewType === 'grid' && <WishlistGridList wishlist={mockWishList} />}

        {viewType === 'list' && <WishlistRowList wishlist={mockWishList} />}
      </div>
    </div>
  );
}
