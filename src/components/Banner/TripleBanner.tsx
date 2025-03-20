'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';

export default function TripleBanner() {
  const { data: tripleBannerList, isLoading } = useGetBannerList('triple');

  return (
    <section className='flex justify-center items-center gap-[6px]'>
      {tripleBannerList &&
        tripleBannerList.map((banner, index) => (
          <Link key={index} href={banner.banner_link}>
            <div className='w-[430px] h-[150px]'>
              <Image src={banner.banner_image_url} width={430} height={150} alt={`${banner.banner_name} banner image`} className='object-cover' />
            </div>
          </Link>
        ))}
    </section>
  );
}
