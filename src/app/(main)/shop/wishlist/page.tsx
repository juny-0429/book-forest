'use client';

import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import Select from 'src/components/Select/Select';
import LucideIcons from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';
import Image from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import Link from 'next/link';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜한 도서 - 책숲',
  description: '책숲에서 찜한 도서를 확인하세요. 관심 있는 도서를 저장하고, 쉽게 찾아볼 수 있습니다.',
};

// todo: 인피니티 스크롤 적용하기
export default function wishlist() {
  const options: SelectOption[] = [
    { value: 'option1', label: '찜하기 추가순' },
    { value: 'option2', label: '제목순' },
    { value: 'option3', label: '출판일순' },
  ];

  const mockWishList = Array.from({ length: 40 }, (_, index) => ({
    id: `${index + 1}`,
    title: '새 마음으로',
    author: '이슬아',
    publisher: '헤엄',
    price: 15000,
    discount: 10,
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
            <button>
              <LucideIcons.Grid2X2 size={30} />
            </button>
            <button>
              <LucideIcons.Menu size={30} />
            </button>
          </div>
        </div>

        {/* 찜하기 리스트 */}
        <ul className='grid grid-cols-6 gap-x-8 gap-y-[60px]'>
          {mockWishList &&
            mockWishList.map((book, index) => (
              <li className='flex justify-end'>
                <article className='relative flex flex-col gap-5 w-fit'>
                  <div className='absolute top-0 left-[-30px]'>
                    <CheckBox />
                  </div>
                  <Link href='#'>
                    <Image src={book.bookImage} width={120} alt={`${book.title} 표지`} className='book-item' />
                  </Link>

                  <div className='flex flex-col items-center gap-1'>
                    <p className='text-body-16m text-ui-text-title'>{book.title}</p>

                    <address className='flex justify-center items-center gap-2'>
                      <cite className='text-body-14m text-ui-text-description'>{book.author}</cite>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-14m text-ui-text-description'>{book.publisher}</span>
                    </address>

                    <p className='text-body-16b text-ui-cta'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</p>
                  </div>
                </article>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
