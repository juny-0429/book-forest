import React, { PropsWithChildren } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
