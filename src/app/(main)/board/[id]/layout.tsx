import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 게시글',
  description: '각 게시판의 게시글을 확인하세요.',
};

export default function BoardDetailLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
