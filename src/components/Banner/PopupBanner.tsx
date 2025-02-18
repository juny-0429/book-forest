'use client';

import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import SampleBannerImg from '@/assets/images/sample-banner-2.png';
import useHideForOneDay from 'src/hooks/useHideForOneDay';

export default function PopupBanner() {
  const { isVisible, hideForOneDay } = useHideForOneDay('popupBanner');

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
