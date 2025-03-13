'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function SideBanner() {
  const { data: sideBanner, isLoading } = useGetBannerList('side');

  return (
    <div className='relative w-[200px] h-[300px] overflow-hidden rounded-[12px] bg-gray-50'>
      {isLoading || !sideBanner?.data || sideBanner.data.length === 0 ? (
        <div className='absolute inset-0 flex justify-center items-center w-full h-full bg-gray-50'>
          <p>등록된 이미지가 없습니다.</p>
        </div>
      ) : (
        <Link href='#'>
          <Image src={sideBanner.data[0].banner_image_url} alt='banner image' width={200} height={300} className='absolute inset-0 w-full h-full object-cover' />
        </Link>
      )}
    </div>
  );
}
