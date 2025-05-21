import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 카테고리 관리',
  description: '책숲의 카테고리를 관리하는 관리자 페이지입니다.',
  robots: 'noindex, nofollow',
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>;
}
