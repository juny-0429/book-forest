import React from 'react';
import ShopSidebar from '../shop/_components/ShopSidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex gap-[50px] w-full'>
      <ShopSidebar />
      {children}
    </div>
  );
}
