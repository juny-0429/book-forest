'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'src/lib/utils';
import AdminProfileBox from './AdminProfileBox';
import adminMenuList from '../_data/adminMenuList.data';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className='flex flex-col gap-[33px] w-[210px]'>
      {/* 관리자 프로필 */}
      <AdminProfileBox />

      {/* 관리자 메뉴 */}
      <nav aria-label='관리자 페이지 내비게이션' className='flex flex-col gap-10'>
        <ul className='flex flex-col gap-5'>
          {Object.values(adminMenuList).map((category) => (
            <li key={category.label} className='flex flex-col gap-2'>
              <p className='text-body-18m text-ui-text-title'>{category.label}</p>

              <ul className='flex flex-col gap-2 ml-2'>
                {category.subMenu.map((menu) => {
                  const isActive = pathname === menu.path;

                  return (
                    <li key={menu.label} className='text-nowrap'>
                      <Link href={menu.path || '#'} className={cn('text-body-16r', isActive ? 'text-ui-cta font-semibold' : 'text-ui-text-body')}>
                        {menu.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <button className='text-body-16b text-ui-cta'>로그아웃</button>
      </nav>
    </aside>
  );
}
