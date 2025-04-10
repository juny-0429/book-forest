import Autoplay from 'embla-carousel-autoplay';
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'src/components/Carousel/Carousel';
import Image from 'next/image';
import { cn } from 'src/lib/utils';
import LucideIcons from 'src/theme/lucideIcon';

interface BookMainImageSwiperProps {
  mainImageList: string[];
}

export default function BookMainImageSwiper({ mainImageList }: BookMainImageSwiperProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='max-w-[400px] w-full'>
      <Carousel opts={{ align: 'start', loop: true }} setApi={setApi}>
        <CarouselContent className='w-full'>
          {mainImageList &&
            mainImageList.map((image, index) => (
              <CarouselItem key={index}>
                <div className='w-full'>
                  <Image src={image} width={400} height={300} alt='책 대표 이미지' className='book-item' />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      <div className='flex justify-center items-center w-full mt-2 gap-1'>
        <button onClick={() => api?.scrollPrev()} className='text-white p-1 rounded bg-black/50 hover:bg-black/80'>
          <LucideIcons.ChevronLeft size={20} />
        </button>

        <div className='px-2 py-1 text-body-14r text-white bg-black/50 rounded'>
          {String(current).padStart(2, '0')} - {String(count).padStart(2, '0')}
        </div>

        <button onClick={() => api?.scrollNext()} className='text-white p-1 rounded bg-black/50 hover:bg-black/80'>
          <LucideIcons.ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
