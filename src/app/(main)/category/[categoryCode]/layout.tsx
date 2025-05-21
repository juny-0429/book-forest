import React from 'react';
import CategorySidebar from './_components/CategorySidebar';

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex gap-[50px] w-full'>
      <CategorySidebar />
      {children}
    </div>
  );
}
