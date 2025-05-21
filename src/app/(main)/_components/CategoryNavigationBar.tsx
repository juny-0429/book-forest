import Link from 'next/link';
import React from 'react';
import { categoryNavigationList } from '../_data/CategoryNavigationList';
import Image from 'next/image';

export default function CategoryNavigationBar() {
  return (
    <nav>
      <ul className='flex justify-center items-center gap-[40px] mt-10'>
        {categoryNavigationList.map((category) => (
          <li key={category.label}>
            <Link href={category.url} className='flex flex-col justify-center items-center gap-3 group'>
              <div className='flex justify-center items-center w-[100px] h-[100px] bg-gray-200 rounded-[10px]'>
                <Image src={category.icon} width={80} height={80} alt='category icon' className='transition-transform duration-200 group-hover:scale-110' />
              </div>
              <span className='text-body-18m text-ui-text-title'>{category.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
