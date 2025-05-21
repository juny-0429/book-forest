import React from 'react';

export default function AccountDeleteLayout({ children, passwordCheck }: { children: React.ReactNode; passwordCheck: React.ReactNode }) {
  return (
    <div className='w-full'>
      {passwordCheck}
      {children}
    </div>
  );
}
