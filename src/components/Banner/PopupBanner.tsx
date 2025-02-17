'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import SampleBannerImg from '@/assets/images/sample-banner-2.png';

export default function PopupBanner() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  const hideForOneDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem('hideBannerUntil', tomorrow.getTime().toString());
    setIsVisible(false);
  };

  useEffect(() => {
    const hideUntil = localStorage.getItem('hideBannerUntil');
    if (hideUntil && new Date().getTime() < Number(hideUntil)) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  return (
    isVisible && (
      <div className='fixed bottom-4 right-10 z-50 w-fit h-fit rounded-[12px] overflow-hidden'>
        <button onClick={hideForOneDay} className='absolute top-2 right-2 cursor-pointer text-white'>
          <LucideIcons.X size={24} />
        </button>

        <a href='https://github.com/juny-0429' target='_blank' rel='noopener noreferrer'>
          <Image src={SampleBannerImg} width={300} height={170} alt='sample banner image' />
        </a>
      </div>
    )
  );
}
