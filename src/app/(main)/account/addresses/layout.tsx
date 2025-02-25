import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: '배송지 목록 - 책숲',
  description: '등록된 배송지를 확인하고, 새로운 배송지를 추가하거나 수정할 수 있습니다.',
};

export default function AddressesLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>;
}
