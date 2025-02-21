'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import { cn } from 'src/lib/utils';

export default function SaleBooksSlider() {
  const mockNewBookList = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    title: '새 마음으로',
    discount: 10,
    bookImage: SampleBookImg,
  }));
  return (
    <section className='flex flex-col gap-10 w-full'>
      <div className='flex items-center gap-2'>
        <h2 className='text-title-24b text-ui-text-title'>놓치면 후회할 할인 도서</h2>
        <hr className='w-[1px] h-[15px] bg-gray-600' />
        <p className='text-body-16l text-ui-text-description'>한정 기간 동안 제공되는 특별가 도서들을 지금 확인하세요.</p>
      </div>

      {/* 슬라이드 부분 */}
      {/* 참고: https://www.embla-carousel.com/examples/predefined/ */}
      <Carousel opts={{ align: 'start', loop: true, slidesToScroll: 4 }} lassName='w-full'>
        <CarouselContent>
          {mockNewBookList &&
            mockNewBookList.map((book) => (
              <CarouselItem key={book.id} className='md:basis-1/2 lg:basis-1/4'>
                <div className='flex flex-col justify-end items-center gap-5 w-full'>
                  <Image src={book.bookImage} width={200} alt={`${book.title} book image`} className='book-item' />

                  <div className='flex flex-col w-[200px]'>
                    <span className='text-body-18m text-ui-text-title'>{book.title}</span>
                    <span className='text-title-24b text-ui-cta text-end'>{book.discount}% 할인중</span>
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
