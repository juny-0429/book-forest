'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import SampleBannerImg from '@/assets/images/sample-banner-3.png';
import useHideForOneDay from 'src/hooks/useHideForOneDay';

export default function ShowHideBanner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isVisible, hideForOneDay } = useHideForOneDay('showHideBanner');

  return (
    isVisible && (
      <div className='fixed bottom-4 left-4 w-fit h-fit'>
        <AnimatePresence initial={false}>
          {isPopupOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              key='box'
              className='absolute bottom-12 left-0 w-[400px] h-fit bg-white rounded-[12px] overflow-hidden shadow-blur-6-50'
            >
              <Image src={SampleBannerImg} alt='sample book image' />
              <button type='button' onClick={hideForOneDay} className='flex justify-end items-center gap-2 w-full px-2 py-1 text-body-12r text-ui-text-body hover:text-ui-cta'>
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
          예민함을 극복하는 비밀, 뇌과학으로 풀어보세요.
          <LucideIcons.Pointer size={20} />
        </motion.button>
      </div>
    )
  );
}
