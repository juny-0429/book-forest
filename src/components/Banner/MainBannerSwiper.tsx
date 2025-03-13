'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function mainBannerListSwiper() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<SwiperClass | null>(null);

  const { data: mainBannerList, isLoading } = useGetBannerList('main');

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
      <div className='relative w-full max-w-[1050px] max-h-[300px] mx-auto rounded-[12px] overflow-hidden'>
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
          {mainBannerList &&
            mainBannerList.map((banner, index) => (
              <SwiperSlide key={index} className='flex justify-center items-center'>
                <Link href={banner.banner_link}>
                  <Image src={banner.banner_image_url} width={1050} height={300} alt={`${banner.banner_name} banner image`} className='w-full h-auto max-w-[1050px] max-h-[300px] object-cover' />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>

        <div className='absolute bottom-4 right-4 flex items-center gap-1 z-10'>
          {/* ✅ 일시정지/재생 버튼 */}
          <button className='flex justify-center items-center w-10 h-10 text-white bg-black/50 rounded-[5px]' onClick={toggleAutoplay}>
            {isPlaying ? <LucideIcons.Pause size={24} /> : <LucideIcons.Play size={24} />}
          </button>

          <div className='flex items-center gap-1 px-3 py-1 text-body-16m text-white bg-black/50 rounded-[5px]'>
            <button className='custom-swiper-prev flex justify-center items-center w-8 h-8'>
              <LucideIcons.ChevronLeft size={24} />
            </button>
            <span className='w-[55px] text-center'>
              {currentIndex} / {mainBannerList?.length}
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
                {mainBannerList &&
                  mainBannerList.map((banner, index) => (
                    <a key={index} href={banner.banner_link} target='_blank' rel='noopener noreferrer' className='rounded-[8px] cursor-pointer'>
                      <Image src={banner.banner_image_url} width={700} height={300} alt='sample banner image' className='border border-solid border-gray-200' />
                    </a>
                  ))}
              </div>

              {!mainBannerList && <p className='text-body-18m text-ui-text-description'>현재 등록되어 있는 이벤트가 없습니다.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
