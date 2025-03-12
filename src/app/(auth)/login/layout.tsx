import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 로그인',
  description: '책숲에 로그인하고 독서의 즐거움을 함께하세요!',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>;
}
