import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 장바구니',
  description: '책숲에서 담아둔 도서를 확인하고, 결제 단계로 이동해보세요. 원하는 책을 간편하게 관리하고 구매할 수 있습니다.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>;
}
