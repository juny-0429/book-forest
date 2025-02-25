import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: '찜한 도서 - 책숲',
  description: '책숲에서 찜한 도서를 확인하세요. 관심 있는 도서를 저장하고, 쉽게 찾아볼 수 있습니다.',
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
