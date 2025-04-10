'use client';

import React from 'react';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
import { useGetTagProductList } from '../_hooks/react-query/useGetTagProductList';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';

export default function RecommendedBooks() {
  const { data: taggedProductList } = useGetTagProductList('MD_PICK');

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='추천의 숲' description='숲지기 강력 추천 도서' />

      <div className='grid grid-cols-5 gap-auto gap-y-[50px]'>
        {taggedProductList &&
          taggedProductList.map((book) => (
            <article key={book.productId} className='flex flex-col gap-[30px]'>
              <Link href={`${appRoutes.productDetail}/${book.productId}`}>
                <div className='h-[270px]'>
                  <div className='relative group w-[180px]'>
                    {book.mainImageUrl && <Image src={book.mainImageUrl} width={180} height={180} alt='book image' className='book-item' />}

                    <div className='absolute inset-0 flex flex-col justify-center gap-[10px] w-[180px] p-[10px] opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60 transition-all duration-300'>
                      <p className='text-body-16b text-white'>책소개</p>
                      <p className='h-full text-caption-10r text-white line-clamp-[12] overflow-hidden'>{book.productSummary}</p>
                      <p className='w-full text-end text-body-18b text-saffron-200'>{book.price.toLocaleString()}원</p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-body-14r text-ui-text-description'>{book.categoryName}</p>

                  <p className='text-title-16b text-ui-text-title'>{book.productName}</p>

                  <div className='flex items-center gap-2'>
                    <span className='text-body-16r text-ui-text-title'>{book.authorName}</span>
                    <hr className='w-[2px] h-[10px] bg-gray-600' />
                    <span className='text-body-16r text-ui-text-title'>{book.publisher}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
      </div>
    </section>
  );
}
