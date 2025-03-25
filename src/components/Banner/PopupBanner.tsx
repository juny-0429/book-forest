'use client';

import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import useHideForOneDay from 'src/hooks/useHideForOneDay';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function PopupBanner() {
  const { isVisible, hideForOneDay } = useHideForOneDay('popupBanner');

  const { data: popupBannerList, isLoading } = useGetBannerList('popup', isVisible === true);

  if (isLoading || !popupBannerList?.length) return null;

  return (
    isVisible && (
      <div className='fixed bottom-4 right-10 z-50 w-fit h-fit overflow-hidden'>
        <div className='flex justify-end items-center gap-1 px-1 py-[2px]'>
          <span>오늘 하루 보지 않기</span>
          <button onClick={hideForOneDay} className=''>
            <LucideIcons.X size={24} />
          </button>
        </div>

        <a href='https://github.com/juny-0429' target='_blank' rel='noopener noreferrer'>
          <Image src={popupBannerList[0].banner_image_url} width={300} height={170} alt={`${popupBannerList[0].banner_name} image`} className='rounded-[4px]' />
        </a>
      </div>
    )
  );
}
