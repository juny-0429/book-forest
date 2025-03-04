import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 공시사항',
  description: '책숲의 최신 공지사항을 확인하세요.',
};

export default function NoticeBoardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
