import MainBannerSwiper from 'src/components/Banner/MainBannerSwiper';
import SideBanner from 'src/components/Banner/SideBanner';
import AppLayout from 'src/components/Layout/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className='flex justify-center items-center gap-5'>
        <MainBannerSwiper />
        <SideBanner />
      </div>
    </AppLayout>
  );
}
