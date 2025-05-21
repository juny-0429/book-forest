import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 아이디 찾기',
  description: '책숲의 아이디 찾기 페이지입니다.',
};

export default function FindIdLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-full'>{children}</div>;
}
