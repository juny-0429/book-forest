import React from 'react';
import shopMenuList from '../_data/shopMenuList.data';
import Link from 'next/link';
import UserProfileBox from './UserProfileBox';

export default function ShopSidebar() {
  return (
    <aside className='flex flex-col gap-[33px]'>
      {/* 유저 프로필 */}
      <UserProfileBox />

      {/* 마이페이지 메뉴 */}
      <nav aria-label='마이페이지 내비게이션' className='flex flex-col gap-10'>
        <ul className='flex flex-col gap-5'>
          {Object.values(shopMenuList).map((category) => (
            <li key={category.label} className='flex flex-col gap-2'>
              <p className='text-body-18m text-ui-text-title'>{category.label}</p>

              <ul className='flex flex-col gap-2 ml-2'>
                {category.subMenu.map((menu) => (
                  <li key={menu.label}>
                    <Link href={menu.path || '#'} className='text-body-14r text-ui-text-title'>
                      {menu.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button className='text-body-16b text-ui-cta'>로그아웃</button>
      </nav>
    </aside>
  );
}
