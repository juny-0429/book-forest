import React from 'react';
import PoliciesNavigation from './_components/PoliciesNavigation';

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <PoliciesNavigation />
      {children}
    </div>
  );
}
