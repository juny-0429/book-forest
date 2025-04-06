'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { cn } from 'src/lib/utils';
import { useGetTagProductList } from '../_hooks/react-query/useGetTagProductList';
import { TaggedProductItemDto } from '../_dtos/getTagProductList.dto';

export default function MonthlyBookPick() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<TaggedProductItemDto>();

  const { data: taggedProductList } = useGetTagProductList('MONTHLY_RECOMMENDED');

  useEffect(() => {
    if (!api || !taggedProductList || taggedProductList.length === 0) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();

      if (index >= 0 && index < taggedProductList.length) {
        setSelectedIndex(index);
        setSelectedBook(taggedProductList[index]);
      }
    };

    api.on('select', onSelect);
    onSelect(); // 초기 실행

    return () => {
      api.off('select', onSelect);
    };
  }, [api, taggedProductList]);

  return (
    <section className='flex flex-col gap-5 w-full'>
      <SectionTitle title='이달의 책' description='놓치면 아쉬운 이번 달의 필독서' />

      {/* 슬라이드 부분 */}
      {/* 참고: https://www.embla-carousel.com/examples/predefined/ */}
      <Carousel opts={{ align: 'center', loop: true }} setApi={setApi} className='w-full'>
        <CarouselContent className='h-[600px]'>
          {taggedProductList &&
            taggedProductList.map((book, index) => (
              <CarouselItem key={book.productId} className='md:basis-1/2 lg:basis-1/3'>
                <div className={cn('flex justify-center items-center w-full h-full transition-transform duration-300', selectedIndex === index ? 'scale-150' : 'scale-70 opacity-75')}>
                  <div className={cn('flex flex-col justify-center items-center gap-5 w-[270px] h-[390px] ', selectedIndex === index ? '' : 'bg-gray-200 rounded-[10px]')}>
                    {selectedIndex !== index && <p className='text-body-14b text-ui-text-title'>[{book.categoryName}]</p>}

                    {book.mainImageUrl && (
                      <Image
                        src={book.mainImageUrl}
                        width={selectedIndex === index ? 200 : 150}
                        height={170}
                        alt={`${book.productName} book image`}
                        className={cn('book-item', selectedIndex === index ? 'book-item shadow-[0px_0px_30px_rgba(23,87,97,0.6)]' : '')}
                      />
                    )}

                    {selectedIndex !== index && (
                      <div className='flex flex-col gap-2'>
                        <p className='text-body-14m text-ui-text-title'>{book.productName}</p>

                        <div className='flex items-center gap-2 w-[170px]'>
                          <span className='text-body-12m text-ui-text-description'>{book.authorName}</span>
                          <hr className='w-[1px] h-[8px] bg-gray-600' />
                          <span className='text-body-12m text-ui-text-description'>{book.publisher}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* todo: 별도 api 지정 */}
      <div className='flex flex-col items-center gap-5'>
        <p className='font-gyeonggiBatang text-title-24r text-ui-text-description text-center whitespace-pre-line'>{selectedBook?.productSummary}</p>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-title-32b text-ui-text-title'>{selectedBook?.productName}</p>

          <div className='flex justify-center items-center gap-2'>
            <span className='text-body-18m text-ui-text-description'>{selectedBook?.authorName}</span>
            <hr className='w-[1px] h-[8px] bg-gray-600' />
            <span className='text-body-18m text-ui-text-description'>{selectedBook?.publisher}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
