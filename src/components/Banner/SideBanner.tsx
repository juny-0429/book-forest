import React from 'react';
import SampleBannerImg from '@/assets/images/sample-banner-4.png';
import Link from 'next/link';
import Image from 'next/image';

export default function SideBanner() {
  return (
    <div className='max-h-[300] overflow-hidden rounded-[12px] '>
      <Link href='#'>
        <Image src={SampleBannerImg} alt='banner image' />
      </Link>
    </div>
  );
}
