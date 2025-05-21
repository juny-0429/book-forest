'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import SectionTitle from './SectionTitle';
import { useGetTagProductList } from '../_hooks/react-query/useGetTagProductList';
import { TaggedProductItemDto } from '../_dtos/getTagProductList.dto';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';

export default function NewBookSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(2);
  const [count, setCount] = useState(0);
  const [selectedBook, setSelectedBook] = useState<TaggedProductItemDto | null>(null);

  const { data: taggedProductList } = useGetTagProductList('NEW');

  useEffect(() => {
    if (taggedProductList && taggedProductList.length > 0) {
      setSelectedBook(taggedProductList[current - 1]);
    }
  }, [current, taggedProductList]);

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
      <SectionTitle title='화제의 신간' description='지금 가장 핫한 신작을 한눈에' />

      {selectedBook && (
        <div className='flex items-start gap-[53px] h-[300px]'>
          <Link href={`${appRoutes.productDetail}/${selectedBook.productId}`}>
            <Image src={selectedBook.mainImageUrl ?? SampleBookImg} width={200} height={100} loading='eager' alt='book image' className='book-item' />
          </Link>

          <div className='flex flex-col items-start gap-10 pt-2 h-full'>
            <div className='flex flex-col gap-1'>
              <p className='text-title-32r text-ui-text-title'>{selectedBook.productName}</p>

              <div className='flex items-center gap-2 text-body-14m text-ui-text-description'>
                <address>{selectedBook.authorName}</address>
                <hr className='w-[1px] h-2 bg-gray-600' />
                <span>{selectedBook.publisher}</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {selectedBook.discount && selectedBook.discount > 0 ? (
                <>
                  <span className='text-body-18b text-ui-text-cto'>{selectedBook.discount.toLocaleString()}%</span>
                  <span className='text-title-24b text-ui-text-title'>{(selectedBook.price * (1 - selectedBook.discount / 100)).toLocaleString('ko-KR')}원</span>
                  <span className='text-body-14l text-ui-text-description line-through'>{selectedBook.price.toLocaleString('ko-KR')}원</span>
                </>
              ) : (
                <span className='text-title-24b text-ui-text-title'>{selectedBook.price.toLocaleString('ko-KR')}원</span>
              )}
            </div>

            <p className='w-[550px] text-body-14l text-ui-text-description whitespace-pre-line overflow-hidden text-ellipsis'>{selectedBook.productSummary}</p>
          </div>
        </div>
      )}

      {/* 슬라이드 부분 */}
      {/* 참고: https://www.embla-carousel.com/examples/predefined/ */}
      <Carousel opts={{ align: 'start', loop: true }} setApi={setApi} className='w-full'>
        <CarouselContent>
          {taggedProductList &&
            taggedProductList.map((book) => (
              <CarouselItem key={book.productId} className='md:basis-1/2 lg:basis-1/5'>
                <Link href={`${appRoutes.productDetail}/${book.productId}`}>
                  <div className='flex flex-col items-center gap-2 w-full'>
                    <div className='w-[170px] h-[270px]'>{book.mainImageUrl && <Image src={book.mainImageUrl} alt='product image' width={170} height={0} className='book-item' />}</div>

                    <div className='flex justify-between items-baseline w-[170px]'>
                      <span className='text-body-16m text-ui-text-title'>{book.productName}</span>
                      <span className='text-body-12m text-ui-text-description whitespace-nowrap'>{book.categoryName}</span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
