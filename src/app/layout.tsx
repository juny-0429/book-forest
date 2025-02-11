import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '책숲 - 독서를 사랑하는 당신을 위한 책 쇼핑몰',
  description: '책숲은 다양한 분야의 도서를 합리적인 가격에 제공하는 온라인 책 판매 쇼핑몰입니다. 최신 도서부터 고전까지, 독서의 즐거움을 경험해보세요.',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
