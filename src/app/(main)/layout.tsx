import React from 'react';
import PopupBanner from 'src/components/Banner/PopupBanner';
import ShowHideBanner from 'src/components/Banner/ShowHideBanner';
import AppLayout from 'src/components/Layout/AppLayout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      {children}
      <ShowHideBanner />
      <PopupBanner />
    </AppLayout>
  );
}
