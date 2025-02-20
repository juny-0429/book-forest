import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲',
  description: '책숲은 다양한 분야의 도서를 합리적인 가격에 제공하는 온라인 책 판매 쇼핑몰입니다. 최신 도서부터 고전까지, 독서의 즐거움을 경험해보세요.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
