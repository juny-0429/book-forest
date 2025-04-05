import React, { PropsWithChildren } from 'react';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      {/* header 높이 171px */}
      <div className='flex flex-grow w-full max-w-[1280px] min-h-[calc(100vh-171px-50px)] mx-auto my-[50px]'>{children}</div>
      <Footer />
    </div>
  );
}
