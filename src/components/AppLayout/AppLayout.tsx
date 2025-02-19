import React, { PropsWithChildren } from 'react';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='mt-[172p]'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
