'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import SectionTitle from './SectionTitle';

export default function NewBookSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(2);
  const [count, setCount] = React.useState(0);

  const currentBook = {
    title: '새 마음으로',
    category: '산문',
    author: '이슬아',
    publisher: '헤엄',
    price: 15000,
    discount: 10,
    description:
      '이슬아 작가는 훌륭한 에세이스트이자 훌륭한 인터뷰어다. 첫 번째 인터뷰집 <깨끗한 존경>으로 그 사실을 이미 증명한 바 있다. 오래 기다려 만난 신간 <창작과 농담> <새 마음으로> 역시 작가의 인터뷰어로서의 면모를 다각도로 볼 수 있는, 좋은 인터뷰집이다. <창작과 농담>은 작가가 흠모하는 예술가들이, <새 마음으로>는 작가가 좋아하는 이웃 어른들이 인터뷰이로 등장한다. 각기 다른 빛깔로 빛을 발하는 이야기들이 수록되어 있어 꼭 함께 읽기를 추천한다.',
    bookImage: SampleBookImg,
  };

  const mockNewBookList = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    title: '새 마음으로',
    category: '산문',
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
      <SectionTitle title='화제의 신간' description='지금 가장 핫한 신작을 한눈에' />

      <div className='flex items-center gap-[53px]'>
        <Image src={currentBook.bookImage} width={200} alt='book image' className='book-item' />

        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-1'>
            <p className='text-title-32r text-ui-text-title'>{currentBook.title}</p>

            <div className='flex items-center gap-2 text-body-14m text-ui-text-description'>
              <address>{currentBook.author}</address>
              <hr className='w-[1px] h-2 bg-gray-600' />
              <span>{currentBook.publisher}</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-body-18b text-ui-text-cto'>{currentBook.discount.toLocaleString()}%</span>
            <span className='text-title-24b text-ui-text-title'>{(currentBook.price * (1 - currentBook.discount / 100)).toLocaleString('ko-KR')}원</span>
            <span className='text-body-14l text-ui-text-description line-through'>{currentBook.price}원</span>
          </div>

          <p className='w-[550px] text-body-14l text-ui-text-description'>{currentBook.description}</p>
        </div>
      </div>

      {/* 슬라이드 부분 */}
      {/* 참고: https://www.embla-carousel.com/examples/predefined/ */}
      <Carousel opts={{ align: 'start', loop: true }} setApi={setApi} className='w-full'>
        <CarouselContent>
          {mockNewBookList &&
            mockNewBookList.map((book) => (
              <CarouselItem key={book.id} className='md:basis-1/2 lg:basis-1/5'>
                <div className='flex flex-col items-center gap-2 w-full'>
                  <div className='w-[170px]'>
                    <Image src={book.bookImage} width={170} alt={`${book.title} book image`} className='book-item' />
                  </div>

                  <div className='flex justify-between items-center w-[170px]'>
                    <span className='text-body-16m text-ui-text-title'>{book.title}</span>
                    <span className='text-body-12m text-ui-text-description'>{book.category}</span>
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
