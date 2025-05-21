'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'src/components/Carousel/Carousel';
import { type CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import { cn } from 'src/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function CategoryBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { data: categoryBannerList } = useGetBannerList('category');

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='relative mx-10 h-[273px]'>
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        setApi={setApi}
        className='w-full'
      >
        <CarouselContent className='w-full'>
          {categoryBannerList &&
            categoryBannerList.map((banner, index) => (
              <CarouselItem key={index}>
                <div className='w-full h-full rounded-[16px] overflow-hidden'>
                  <Image src={banner.banner_image_url} width={1100} height={300} alt={`${banner.banner_name} image`} />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* 배너 페이지네이션 */}
      <div className='absolute bottom-2 flex justify-center items-center w-full'>
        <div className='flex justify-center items-center gap-1 w-fit p-1 rounded-full bg-black/60'>
          {categoryBannerList &&
            Array.from({ length: categoryBannerList?.length }, (_, index) => (
              <button key={index} onClick={() => api?.scrollTo(index)} className={cn('w-3 h-3 rounded-full', current === index ? 'w-6 bg-green-300' : 'bg-gray-300')} />
            ))}
        </div>
      </div>
    </div>
  );
}
