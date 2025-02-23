import React from 'react';
import Image from 'next/image';
import SampleUserImg from '@/assets/images/author/이슬아.png';
import LucideIcons from 'src/theme/lucideIcon';
import IconButton from 'src/components/Button/IconButton';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';

export default function UserProfileBox() {
  return (
    <section className='flex flex-col items-center gap-4 px-5 py-4 border border-solid border-gray-300 rounded-[6px]'>
      <figure className='relative'>
        <div className=' w-[100px] h-[100ox] rounded-full overflow-hidden'>
          <Image src={SampleUserImg} alt='user profile' />
        </div>

        <button className='absolute bottom-0 right-0 flex justify-center items-center w-7 h-7 bg-gray-600 rounded-full'>
          <LucideIcons.Camera size={16} className='text-white' />
        </button>
      </figure>

      <div className='flex justify-between items-center w-full'>
        <p className='text-body-16b text-ui-text-title'>juny_0429</p>

        <IconButton height={24}>
          <LucideIcons.Settings size={16} strokeWidth={1} className='text-gray-900' />
        </IconButton>
      </div>

      <hr className='w-full h-[1px] bg-slate-300' />

      {/* 바로가기 메뉴 */}
      <nav className='mt-4' aria-label='사용자 바로가기 메뉴'>
        <ul className='flex justify-around gap-4'>
          <li>
            <Link href='#' className='flex flex-col items-center gap-1'>
              <LucideIcons.ShoppingCart size={24} />
              <p className='text-body-16m text-ui-text-title'>카트</p>
              <p className='text-body-18m text-ui-text-body'>7</p>
            </Link>
          </li>

          <li>
            <Link href={appRoutes.shop.shoppingHistory.wishlist} className='flex flex-col items-center gap-1'>
              <LucideIcons.Heart size={24} />
              <p className='text-body-16m text-ui-text-title'>찜하기</p>
              <p className='text-body-18m text-ui-text-body'>3</p>
            </Link>
          </li>

          <li>
            <Link href='#' className='flex flex-col items-center gap-1'>
              <LucideIcons.Ticket size={24} />
              <p className='text-body-16m text-ui-text-title'>쿠폰</p>
              <p className='text-body-18m text-ui-text-body'>5</p>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
