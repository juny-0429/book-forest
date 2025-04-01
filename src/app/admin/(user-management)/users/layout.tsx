import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '책숲 | 회원 관리',
  description: '책숲의 회원 정보를 관리하는 관리자 페이지입니다.',
  robots: 'noindex, nofollow',
};

export default function UserManagementLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
