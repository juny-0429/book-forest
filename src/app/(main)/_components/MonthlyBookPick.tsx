'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/components/Carousel/Carousel';
import Image from 'next/image';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import SampleBookImg2 from '@/assets/images/books/두사람의인터네셔널.jpg';
import SectionTitle from './SectionTitle';
import { cn } from 'src/lib/utils';

export default function MonthlyBookPick() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const mockNewBookList = Array.from({ length: 4 }, (_, index) => ({
    id: `${index + 1}`,
    title: '두 사람의 인터네셔널',
    category: '소설 부분',
    author: '김기태',
    publisher: '문학동네',
    bookImage: SampleBookImg2,
  }));

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());

    api.on('select', onSelect);
    onSelect(); // 초기 실행

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='이달의 책' description='놓치면 아쉬운 이번 달의 필독서' />

      {/* 슬라이드 부분 */}
      {/* 참고: https://www.embla-carousel.com/examples/predefined/ */}
      <Carousel opts={{ align: 'center', loop: true }} setApi={setApi} className='w-full'>
        <CarouselContent className='h-[600px]'>
          {mockNewBookList &&
            mockNewBookList.map((book, index) => (
              <CarouselItem key={book.id} className='md:basis-1/2 lg:basis-1/3'>
                <div className={cn('flex justify-center items-center w-full h-full transition-transform duration-300', selectedIndex === index ? 'scale-150' : 'scale-70 opacity-75')}>
                  <div className={cn('flex flex-col justify-center items-center gap-5 w-[270px] h-[390px] ', selectedIndex === index ? '' : 'bg-gray-200 rounded-[10px]')}>
                    {selectedIndex !== index && <p className='text-body-14b text-ui-text-title'>[{book.category}]</p>}

                    <Image
                      src={book.bookImage}
                      width={selectedIndex === index ? 230 : 170}
                      alt={`${book.title} book image`}
                      className={cn('book-item', selectedIndex === index ? 'book-item shadow-[0px_0px_30px_rgba(23,87,97,0.6)]' : '')}
                    />

                    {selectedIndex !== index && (
                      <div className='flex flex-col gap-2'>
                        <p className='text-body-14m text-ui-text-title'>{book.title}</p>

                        <div className='flex items-center gap-2 w-[170px]'>
                          <span className='text-body-12m text-ui-text-description'>{book.author}</span>
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
        <p className='font-gyeonggiBatang text-title-24r text-ui-text-description text-center'>
          바로 지금, 한국문학의 가장 뜨거운 신인 <br />
          2024 젊은작가상 수상 작가 김기태 첫 소설집
        </p>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-title-32b text-ui-text-title'>두 사람의 인터네셔널</p>

          <div className='flex justify-center items-center gap-2'>
            <span className='text-body-18m text-ui-text-description'>김기태</span>
            <hr className='w-[1px] h-[8px] bg-gray-600' />
            <span className='text-body-18m text-ui-text-description'>문학동네</span>
          </div>
        </div>

        <div className='flex justify-center items-center px-10 py-5 border-t border-b border-solid border-gray-400'>
          <p className='text-body-16l text-ui-text-description'>
            배운 게 별로 없었지만 실은 모든 것을 알고 있었던 존자 씨와 병찬 씨. 그들의 생애는 서로를 살리며 흘러왔다. 한 고생이 끝나면 다음 고생이 있는 생이었다. 어떻게 자라야겠다고 다짐할 새도 없이 자라버리는 시간이었다. 고단한 생로병사 속에서 태어나고 만난 당신들, 내 엄마를 낳은 당신들, 해가 지면 저녁상을 차리고...
            배운 게 별로 없었지만 실은 모든 것을 알고 있었던 존자 씨와 병찬 씨. 그들의 생애는 서로를 살리며 흘러왔다. 한 고생이 끝나면 다음 고생이 있는 생이었다. 어떻게 자라야겠다고 다짐할 새도 없이 자라버리는 시간이었다. 고단한 생로병사 속에서 태어나고 만난 당신들, 내 엄마를 낳은 당신들, 해가 지면 저녁상을 차리고...
            배운 게 별로 없었지만 실은 모든 것을 알고 있었던 존자 씨와 병찬 씨. 그들의 생애는 서로를 살리며 흘러왔다. 한 고생이 끝나면 다음 고생이 있는 생이었다. 어떻게 자라야겠다고 다짐할 새도 없이 자라버리는 시간이었다. 고단한 생로병사 속에서 태어나고 만난 당신들, 내 엄마를 낳은 당신들, 해가 지면 저녁상을 차리고...
          </p>
        </div>
      </div>
    </section>
  );
}
