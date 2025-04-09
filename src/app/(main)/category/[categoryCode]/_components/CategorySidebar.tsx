'use client';

import Link from 'next/link';
import React from 'react';
import { useGetCategorySidebar } from '../_hooks/react-query/useGetCategorySidebar';
import { useParams } from 'next/navigation';
import { appRoutes } from 'src/routes/appRoutes';

export default function CategorySidebar() {
  const params = useParams();
  const categoryCode = params.categoryCode;

  const { data } = useGetCategorySidebar(categoryCode as string);

  const currentGroup = data?.currentGroup;
  const otherTopCategoryList = data?.otherTopCategoryList;

  return (
    <nav className='flex flex-col gap-[50px] w-[150px]'>
      <section className='flex flex-col gap-5'>
        <h2 className='text-body-18b text-ui-text-title'>{currentGroup?.parent?.categoryName}</h2>

        <ul className='flex flex-col gap-2'>
          {currentGroup?.children.map((category) => (
            <li key={category.categoryCode} className='text-body-16r text-ui-text-body'>
              <Link href={`${appRoutes.category}/${category.categoryCode}`}>{category.categoryName}</Link>
            </li>
          ))}
        </ul>
      </section>

      <hr className='w-full h-[2px] bg-gray-300' />

      <section>
        <ul className='flex flex-col gap-2'>
          {otherTopCategoryList?.map((topCategory) => (
            <li key={topCategory.categoryCode}>
              <Link href={`${appRoutes.category}/${topCategory.categoryCode}`} className='text-body-18b text-ui-text-title'>
                {topCategory.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
