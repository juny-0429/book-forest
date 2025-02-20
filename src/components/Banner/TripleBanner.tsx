import Link from 'next/link';
import Image from 'next/image';
import SampleBannerImg from '@/assets/images/sample-banner-6.png';

export default function TripleBanner() {
  return (
    <section className='flex justify-center items-center gap-[6px]'>
      <Link href='#'>
        <Image src={SampleBannerImg} alt='banner image' />
      </Link>

      <Link href='#'>
        <Image src={SampleBannerImg} alt='banner image' />
      </Link>

      <Link href='#'>
        <Image src={SampleBannerImg} alt='banner image' />
      </Link>
    </section>
  );
}
