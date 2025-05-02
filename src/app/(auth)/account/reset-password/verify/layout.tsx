import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 비밀번호 찾기',
  description: '회원님의 정보를 확인하고 비밀번호를 재설정할 수 있는 페이지입니다.',
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>;
}
