import React, { PropsWithChildren } from 'react';
import Header from '../Header/Header';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
