import MainBannerSwiper from 'src/components/Banner/MainBannerSwiper';
import SideBanner from 'src/components/Banner/SideBanner';
import AppLayout from 'src/components/Layout/AppLayout';
import CategoryNavigationBar from './(main)/_components/CategoryNavigationBar';
import DualBanner from 'src/components/Banner/DualBanner';
import TripleBanner from 'src/components/Banner/TripleBanner';
import NewBooksSlider from './(main)/_components/NewBooksSlider';
import BestBooksSlider from './(main)/_components/BestBooksSlider';
import MeetTheAuthor from './(main)/_components/MeetTheAuthor';

export default function Home() {
  return (
    <AppLayout>
      {/* 메인 베너 */}
      <div className='flex justify-center items-center gap-5'>
        <MainBannerSwiper />
        <SideBanner />
      </div>

      {/* 카테고리 네비게이션 */}
      <CategoryNavigationBar />

      {/* 화제의 신간 */}
      <NewBooksSlider />

      {/* 가로 2열 배너 */}
      <DualBanner />

      {/* 베스트 도서 */}
      <BestBooksSlider />

      {/* 작가와의 만남 */}
      <MeetTheAuthor />

      {/* 가로 3열 배너 */}
      <TripleBanner />
    </AppLayout>
  );
}
