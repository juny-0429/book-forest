import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 아이디 찾기 결과',
  description: '입력하신 정보로 아이디를 찾은 결과를 확인할 수 있습니다.',
};

export default function FindIdResultLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full flex-grow'>{children}</div>;
}
