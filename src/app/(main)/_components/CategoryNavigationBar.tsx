import Link from 'next/link';
import React from 'react';
import { mockCategoryNavigationList } from '../_data/CategoryNavigationList';
import LucideIcons from 'src/theme/lucideIcon';

export default function CategoryNavigationBar() {
  return (
    <nav>
      <ul className='flex justify-center items-center gap-[50px] mt-10'>
        {mockCategoryNavigationList.map((navItem) => (
          <li key={navItem.label}>
            <Link href={navItem.url} className='flex flex-col justify-center items-center gap-3'>
              <div className='flex justify-center items-center w-[70px] h-[70px] bg-gray-200 rounded-[10px]'>
                <LucideIcons.Home size={35} className='text-ui-cta' />
              </div>
              <span className='text-body-16m text-ui-text-title'>{navItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
