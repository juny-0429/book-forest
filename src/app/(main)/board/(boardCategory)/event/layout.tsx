import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 이벤트 게시판',
  description: '책숲의 최신 이벤트를 확인하세요.',
};

export default function EventBoardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
