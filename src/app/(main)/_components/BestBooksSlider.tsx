'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import { cn } from 'src/lib/utils';
import SectionTitle from './SectionTitle';
import { useGetTagProductList } from '../_hooks/react-query/useGetTagProductList';

export default function BestBooksSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(2);
  const [count, setCount] = useState(0);

  const { data: taggedProductList } = useGetTagProductList('BEST');

  const rankedProductList = taggedProductList?.map((book, index) => ({
    ...book,
    rank: index + 1,
  }));

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='베스트' description='독자들에게 가장 사랑받는 인기 도서' />

      {/* 슬라이드 부분 */}
      {/* 참고: https://www.embla-carousel.com/examples/predefined/ */}
      <Carousel opts={{ align: 'start', loop: true }} setApi={setApi} className='w-full'>
        <CarouselContent>
          {rankedProductList &&
            rankedProductList.map((book) => (
              <CarouselItem key={book.productId} className='md:basis-1/2 lg:basis-1/4'>
                <div className='flex flex-col justify-end items-center gap-5 w-full h-[430px]'>
                  <div className='relative'>
                    {book.mainImageUrl && (
                      <Image
                        src={book.mainImageUrl}
                        width={current === book.rank ? 220 : 180}
                        height={200}
                        alt={`${book.productName} book image`}
                        className='book-item transition-all duration-300 ease-in-out'
                      />
                    )}

                    <div
                      className={`absolute top-0 right-[10px] flex justify-center items-center text-white
                      ${current === book.productId ? 'w-[40px] h-[40px] text-title-24b rounded-bl-[10px] rounded-br-[10px] bg-ui-main' : 'w-[30px] h-[30px] text-title-16b rounded-bl-[8px] rounded-br-[8px] bg-green-300 '}`}
                    >
                      {book.rank}
                    </div>
                  </div>

                  <div className={cn('flex justify-between items-baseline', current === book.rank ? 'w-[230px]' : 'w-[180px]')}>
                    <span className='text-body-16b text-ui-text-title'>{book.productName}</span>
                    <span className='text-body-14m text-ui-text-description whitespace-nowrap'>{book.authorName}</span>
                  </div>
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
