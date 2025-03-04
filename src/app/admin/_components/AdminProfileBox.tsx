import React from 'react';
import Image from 'next/image';
import SampleUserImg from '@/assets/images/author/이슬아.png';
import LucideIcons from 'src/theme/lucideIcon';
import IconButton from 'src/components/Button/IconButton';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';

export default function AdminProfileBox() {
  return (
    <section className='flex flex-col items-center gap-4 w-[170px] px-5 py-4 border border-solid border-gray-300 rounded-[6px]'>
      <figure className='relative'>
        <div className=' w-[100px] h-[100ox] rounded-full overflow-hidden'>
          <Image src={SampleUserImg} alt='user profile' />
        </div>

        <button className='absolute bottom-0 right-0 flex justify-center items-center w-7 h-7 bg-gray-600 rounded-full'>
          <LucideIcons.Camera size={16} className='text-white' />
        </button>
      </figure>

      <div className='flex justify-between items-center w-full'>
        <p className='text-body-16b text-ui-text-title'>admin_juny</p>

        <IconButton height={24}>
          <LucideIcons.Settings size={16} strokeWidth={1} className='text-gray-900' />
        </IconButton>
      </div>

      <hr className='w-full h-[1px] bg-slate-300' />

      <p className='text-body-16r text-ui-text-description'>일반관리자</p>
    </section>
  );
}
