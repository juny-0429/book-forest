'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import SampleBannerImg from '@/assets/images/sample-banner-1.png';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MainBannerSwiper() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalSlides = 13;
  const swiperRef = useRef<SwiperClass | null>(null);

  const sampleBannerList = Array.from({ length: 13 }, (_, index) => ({
    id: index + 1,
    image: SampleBannerImg,
    title: `배너 ${index + 1}`,
    url: 'https://github.com/juny-0429',
  }));

  const handleSwiper = (swiper: SwiperClass) => {
    swiperRef.current = swiper;
  };

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;

    if (isPlaying) {
      swiperRef.current.autoplay.pause();
    } else {
      swiperRef.current.autoplay.resume();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className='relative w-full max-w-[1000px] max-h-[300px] mx-auto rounded-[12px] overflow-hidden'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.custom-swiper-next',
            prevEl: '.custom-swiper-prev',
          }}
          onSwiper={handleSwiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          className='w-full h-[400px] [&_.swiper-button-prev]:hidden [&_.swiper-button-next]:hidden'
        >
          {sampleBannerList &&
            sampleBannerList.map((_, index) => (
              <SwiperSlide key={index} className='flex justify-center items-center'>
                <Image src={SampleBannerImg} alt='sample banner image' className='w-full h-full object-cover' />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className='absolute bottom-4 right-4 flex items-center gap-2 z-10'>
          {/* ✅ 일시정지/재생 버튼 */}
          <button className='flex justify-center items-center w-10 h-10 text-white bg-black/40 rounded-[5px]' onClick={toggleAutoplay}>
            {isPlaying ? <LucideIcons.Pause size={24} /> : <LucideIcons.Play size={24} />}
          </button>

          <div className='flex items-center gap-2 px-3 py-1 text-body-16m text-white bg-black/40 rounded-[5px]'>
            <button className='custom-swiper-prev flex justify-center items-center w-8 h-8'>
              <LucideIcons.ChevronLeft size={24} />
            </button>
            <span className='w-[55px] text-center'>
              {currentIndex} / {totalSlides}
            </span>
            <button className='custom-swiper-next w-8 h-8 flex items-center justify-center'>
              <LucideIcons.ChevronRight size={24} />
            </button>
            <button className='ml-2' onClick={() => setIsModalOpen(true)}>
              전체보기
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/50' onClick={() => setIsModalOpen(false)}>
          <div className='relative flex flex-col max-w-[80%] py-4 max-h-[80vh] overflow-hidden bg-white rounded-[12px]' onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-between items-center p-4 text-ui-text-title'>
              <h2 className='text-title-24r'>전체 이벤트 보기</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <LucideIcons.X size={24} />
              </button>
            </div>

            <div className='overflow-y-auto flex-grow p-4'>
              <div className='grid grid-cols-2 gap-4'>
                {sampleBannerList &&
                  sampleBannerList.map((banner) => (
                    // 외부 링크는 a태그, 내부 링크는 Link 태그
                    <a key={banner.id} href={banner.url} target='_blank' rel='noopener noreferrer' className='rounded-[8px] cursor-pointer'>
                      <Image src={banner.image} width={700} alt='sample banner image' />
                    </a>
                  ))}
              </div>

              {!sampleBannerList && <p className='text-body-18m text-ui-text-description'>현재 등록되어 있는 이벤트가 없습니다.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
