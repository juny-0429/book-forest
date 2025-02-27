import Link from 'next/link';
import React from 'react';

export default function CategorySidebar() {
  return (
    <nav className='flex flex-col gap-[50px]'>
      <section className='flex flex-col gap-5'>
        <h2 className='text-body-18b text-ui-text-title'>소설</h2>

        <ul className='flex flex-col gap-2'>
          <li className='text-body-16r text-ui-text-body'>
            <Link href=''>한국소설</Link>
          </li>
          <li className='text-body-16r text-ui-text-body'>
            <Link href=''>영미소설</Link>
          </li>
          <li className='text-body-16r text-ui-text-body'>
            <Link href=''>일본소설</Link>
          </li>
          <li className='text-body-16r text-ui-text-body'>
            <Link href=''>북유럽소설</Link>
          </li>
          <li className='text-body-16r text-ui-text-body'>
            <Link href=''>기타소설</Link>
          </li>
        </ul>
      </section>

      <hr className='w-full h-[2px] bg-gray-300' />

      <section>
        <ul className='flex flex-col gap-2'>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              시/에세이
            </Link>
          </li>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              인문
            </Link>
          </li>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              건강
            </Link>
          </li>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              자기계발
            </Link>
          </li>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              정치/사회
            </Link>
          </li>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              과학
            </Link>
          </li>
          <li>
            <Link href='' className='text-body-18b text-ui-text-title'>
              어린이
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
