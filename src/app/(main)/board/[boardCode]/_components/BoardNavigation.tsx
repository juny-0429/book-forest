'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from 'src/lib/utils';
import { appRoutes } from 'src/routes/appRoutes';

export default function BoardNavigation() {
  const pathname = usePathname();

  return (
    <nav className='flex justify-center w-full mb-[50px]'>
      <ul className='flex justify-center items-center w-fit rounded-[5px] overflow-hidden text-body-18m text-ui-text-title'>
        {/* 공지사항 */}
        <li className={cn('flex justify-center items-center w-[150px] px-10 py-3', pathname.startsWith(appRoutes.board.notice) ? 'bg-blue-400 text-white' : 'bg-gray-300')}>
          <Link href={appRoutes.board.notice}>공지사항</Link>
        </li>

        {/* 이벤트 */}
        <li className={cn('flex justify-center items-center w-[150px] px-10 py-3', pathname.startsWith(appRoutes.board.event) ? 'bg-blue-400 text-white' : 'bg-gray-300')}>
          <Link href={appRoutes.board.event}>이벤트</Link>
        </li>

        {/* Q&A */}
        <li className={cn('flex justify-center items-center w-[150px] px-10 py-3', pathname.startsWith(appRoutes.board.qna) ? 'bg-blue-400 text-white' : 'bg-gray-300')}>
          <Link href={appRoutes.board.qna}>Q&A</Link>
        </li>
      </ul>
    </nav>
  );
}
