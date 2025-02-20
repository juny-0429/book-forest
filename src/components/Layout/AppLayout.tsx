import React, { PropsWithChildren } from 'react';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className=' flex flex-col min-h-screen w-full'>
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
