import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 비밀번호 재설정',
  description: '비밀번호를 재설정할 수 있는 페이지입니다.',
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-full'>{children}</div>;
}
