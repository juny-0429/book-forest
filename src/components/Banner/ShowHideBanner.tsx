'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import useHideForOneDay from 'src/hooks/useHideForOneDay';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function ShowHideBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isVisible, hideForOneDay } = useHideForOneDay('showHideBanner');

  const { data: showHideBannerList, isLoading } = useGetBannerList('showHide', isVisible === true);

  if (isLoading || !showHideBannerList?.length) return null;

  return (
    isVisible && (
      <div className='fixed bottom-4 left-4 w-fit h-fit z-50'>
        <AnimatePresence initial={false}>
          {isPopupOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              key='box'
              className='absolute bottom-12 left-0 w-[400px] h-fit bg-white rounded-[12px] overflow-hidden shadow-blur-6-50'
            >
              <Link href={showHideBannerList[0].banner_link}>
                <Image src={showHideBannerList[0].banner_image_url} width={400} height={250} alt='show & hide banner image' priority />
              </Link>
              <button type='button' onClick={hideForOneDay} className='flex items-center gap-2 w-fit px-2 py-1 ml-auto text-body-12r text-ui-text-body hover:text-ui-cta cursor-pointer'>
                <span>오늘 하루 보지 않기</span>
                <LucideIcons.X size={16} />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          whileTap={{ y: 1 }}
          className='absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 w-fit h-fit px-3 py-2 bg-teal-600 text-body-16m text-white whitespace-pre rounded-[12px] shadow-blur-6-50'
        >
          {showHideBannerList[0].banner_name}
          <LucideIcons.Pointer size={20} />
        </motion.button>
      </div>
    )
  );
}
