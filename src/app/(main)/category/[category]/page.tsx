'use client';

import { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'src/components/Breadcrumb/Breadcrumb';
import CategoryBanner from 'src/components/Banner/CategoryBanner/CategoryBanner';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';
import Select from 'src/components/Select/Select';
import { cn } from 'src/lib/utils';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import Image, { StaticImageData } from 'next/image';
import CategoryGridList from './_components/CategoryGridList';
import CategoryRowList from './_components/CategoryRowList';

export interface BookListItem {
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

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const options: SelectOption[] = [
    { value: 'option1', label: '찜하기 추가순' },
    { value: 'option2', label: '제목순' },
    { value: 'option3', label: '출판일순' },
  ];

  const mockBookList: BookListItem[] = Array.from({ length: 30 }, (_, index) => ({
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
    <div className='flex flex-col gap-10 w-full'>
      <div className='space-y-2'>
        <h2 className='text-title-32b text-ui-text-title'>한국소설</h2>

        {/* 탐색 경로 */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/components'>소설</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>한국소설</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <CategoryBanner />

      <div className='flex flex-col items-end gap-4 w-full'>
        <div className='flex justify-center items-center gap-1 w-fit'>
          <LineButton height={40} color='gray' leftIcon={<LucideIcons.Heart size={20} />}>
            찜하기
          </LineButton>
          <LineButton height={40} color='gray' leftIcon={<LucideIcons.ShoppingCart size={20} />}>
            카트담기
          </LineButton>
          <LineButton height={40}>필터</LineButton>
        </div>

        <hr className='w-full h-[1px] bg-gray-300' />

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

      {viewType === 'grid' && <CategoryGridList bookList={mockBookList} />}

      {viewType === 'list' && <CategoryRowList bookList={mockBookList} />}
    </div>
  );
}
