import React from 'react';
import AppLayout from 'src/components/Layout/AppLayout';
import AdminSidebar from './_components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <div className='flex gap-[50px] w-full'>
        <AdminSidebar />
        {children}
      </div>
    </AppLayout>
  );
}
