import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 회원가입',
  description: '책숲의 회원가입 페이지입니다.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full flex-grow'>{children}</div>;
}
