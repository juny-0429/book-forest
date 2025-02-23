import React from 'react';
import ShopSidebar from './_components/ShopSidebar';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex gap-[50px] mb-[50px]'>
      <ShopSidebar />
      {children}
    </div>
  );
}
