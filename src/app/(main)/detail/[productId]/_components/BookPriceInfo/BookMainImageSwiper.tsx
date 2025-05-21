import React, { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from 'src/components/Carousel/Carousel';
import Image from 'next/image';
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
                  <Image src={image} width={400} height={300} priority alt='책 대표 이미지' className='book-item' />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      <div className='flex justify-center items-center w-full mt-2 gap-1'>
        <button onClick={() => api?.scrollPrev()}>
          <LucideIcons.ChevronLeft size={20} />
        </button>

        <div className='text-body-16r text-ui-text-title'>
          {String(current).padStart(2, '0')} - {String(count).padStart(2, '0')}
        </div>

        <button onClick={() => api?.scrollNext()}>
          <LucideIcons.ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
