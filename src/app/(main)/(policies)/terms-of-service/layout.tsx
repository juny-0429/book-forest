import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '책숲 | 이용약관',
  description: '책숲은 책을 사랑하는 사람들을 위한 온라인 도서 관리 플랫폼입니다. 다양한 카테고리의 책을 탐색하고 관리할 수 있습니다.',
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>;
}
