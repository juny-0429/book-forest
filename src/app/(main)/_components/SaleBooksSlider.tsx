'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { useGetTagProductList } from '../_hooks/react-query/useGetTagProductList';

export default function SaleBooksSlider() {
  const { data: taggedProductList } = useGetTagProductList('DISCOUNT');

  const adjustedProductList = taggedProductList
    ? [
        ...taggedProductList,
        ...Array(4 - (taggedProductList.length % 4)).fill(null), // 나머지 부분을 빈 아이템(null)으로 채움
      ]
    : [];

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='놓치면 후회할 할인 도서' description='한정 기간 동안 제공되는 특별가 도서들을 지금 확인하세요.' />

      <Carousel opts={{ align: 'start', loop: true, slidesToScroll: 4 }} className='w-full'>
        <CarouselContent>
          {adjustedProductList.map((book, index) => (
            <CarouselItem key={book ? book.productId : index} className='md:basis-1/2 lg:basis-1/4'>
              <div className='flex flex-col justify-end items-center gap-5 w-full'>
                {book ? (
                  <>
                    <Image src={book.mainImageUrl} width={200} height={200} alt={`${book.productName} book image`} className='book-item' />
                    <div className='flex flex-col w-[200px]'>
                      <span className='text-body-18m text-ui-text-title'>{book.productName}</span>
                      <span className='text-title-16b text-ui-cta text-end'>{book.discount}% 할인중</span>
                    </div>
                  </>
                ) : (
                  <div />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
