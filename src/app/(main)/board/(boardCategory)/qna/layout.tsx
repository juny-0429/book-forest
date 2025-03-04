import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 자주하는 질문 게시판',
  description: '책숲의 자주하는 질문을 확인하세요.',
};

export default function QnaBoardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
