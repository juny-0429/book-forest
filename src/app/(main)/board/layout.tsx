import React from 'react';
import BoardNavigation from './_components/BoardNavigation';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <BoardNavigation />
      {children}
    </div>
  );
}
