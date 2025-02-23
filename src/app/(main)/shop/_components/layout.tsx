import React from 'react';
import ShopSidebar from './ShopSidebar';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ShopSidebar />
      {children}
    </div>
  );
}
