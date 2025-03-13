'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function DualBanner() {
  const { data: dualBannerList, isLoading } = useGetBannerList('dual');

  return (
    <section className='flex justify-center items-center gap-[50px]'>
      {dualBannerList &&
        dualBannerList.map((banner, index) => (
          <Link key={index} href={banner.banner_link}>
            <div className='relative'>
              <Image src={banner.banner_image_url} width={500} height={170} alt={`${banner.banner_name} banner image`} className='w-[500px] h-[170px] object-cover rounded-[10px]' />
              <div className='absolute left-[25px] bottom-[25px] flex justify-center items-center w-[26px] h-[14px] bg-gray-300 rounded-full'>
                <span className='text-[10px] font-bold text-white'>AD</span>
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
}
