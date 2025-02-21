'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import { cn } from 'src/lib/utils';
import SectionTitle from './SectionTitle';

export default function BestBooksSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(2);
  const [count, setCount] = React.useState(0);

  const mockNewBookList = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    title: '새 마음으로',
    author: '이슬아',
    bookImage: SampleBookImg,
  }));

  React.useEffect(() => {
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
          {mockNewBookList &&
            mockNewBookList.map((book) => (
              <CarouselItem key={book.id} className='md:basis-1/2 lg:basis-1/4'>
                <div className='flex flex-col justify-end items-center gap-5 w-full h-[420px]'>
                  <div className='relative'>
                    <Image src={book.bookImage} width={current === parseInt(book.id) ? 250 : 200} alt={`${book.title} book image`} className='book-item transition-all duration-300 ease-in-out' />

                    <div
                      className={`absolute top-0 right-[10px] flex justify-center items-center text-white 
                      ${current === parseInt(book.id) ? 'w-[40px] h-[40px] text-title-24b rounded-bl-[10px] rounded-br-[10px] bg-ui-main' : 'w-[30px] h-[30px] text-title-16b rounded-bl-[8px] rounded-br-[8px] bg-green-300 '}`}
                    >
                      {book.id}
                    </div>
                  </div>

                  <div className={cn('flex justify-between items-center', current === parseInt(book.id) ? 'w-[250px]' : 'w-[200px]')}>
                    <span className='text-body-16m text-ui-text-title'>{book.title}</span>
                    <span className='text-body-12m text-ui-text-description'>{book.author}</span>
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
