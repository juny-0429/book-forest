import React from 'react';
import LucideIcons from 'src/theme/lucideIcon';
import IconButton from 'src/components/Button/IconButton';
import { useAuth } from 'src/provider/authProvider';
import { useGetUserProfile } from 'src/app/(main)/shop/_hooks/react-query/useGetUserProfile';

export default function AdminProfileBox() {
  const { authority } = useAuth();
  const { data: userInfo } = useGetUserProfile();

  return (
    <section className='flex flex-col items-center gap-4 w-[170px] px-5 py-4 border border-solid border-gray-300 rounded-[6px]'>
      <div className='flex justify-between items-center w-full'>
        <p className='text-body-16b text-ui-text-title'>{userInfo?.accountId}</p>

        <IconButton height={24}>
          <LucideIcons.Settings size={16} strokeWidth={1} className='text-gray-900' />
        </IconButton>
      </div>

      <hr className='w-full h-[1px] bg-slate-300' />

      <div>
        <span>직급 : </span>
        <span className='text-body-16r text-ui-text-description'>{authority}</span>
      </div>
    </section>
  );
}
