import Link from 'next/link';
import Image from 'next/image';
import SampleBannerImg from '@/assets/images/sample-banner-5.png';

export default function DualBanner() {
  return (
    <section className='flex justify-center items-center gap-[50px]'>
      <Link href='#' className='rounded-[10px]'>
        <Image src={SampleBannerImg} alt='banner image' />
      </Link>

      <Link href='#' className='rounded-[10px]'>
        <Image src={SampleBannerImg} alt='banner image' />
      </Link>
    </section>
  );
}
