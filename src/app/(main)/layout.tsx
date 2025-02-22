import React from 'react';
import AppLayout from 'src/components/Layout/AppLayout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
