import MainBannerSwiper from 'src/components/Banner/MainBannerSwiper';
import SideBanner from 'src/components/Banner/SideBanner';
import CategoryNavigationBar from './_components/CategoryNavigationBar';
import DualBanner from 'src/components/Banner/DualBanner';
import TripleBanner from 'src/components/Banner/TripleBanner';
import NewBooksSlider from './_components/NewBooksSlider';
import BestBooksSlider from './_components/BestBooksSlider';
import MeetTheAuthor from './_components/MeetTheAuthor';
import RecommendedBooks from './_components/RecommendedBooks';
import SaleBooksSlider from './_components/SaleBooksSlider';
import MonthlyBookPick from './_components/MonthlyBookPick';
import { toastMessage } from 'src/hooks/useToast';

export default function Home() {
  return (
    <div className='flex flex-col w-full'>
      {/* 메인 베너 */}
      <div className='flex justify-center items-center gap-2'>
        <MainBannerSwiper />
        <SideBanner />
      </div>

      {/* 카테고리 네비게이션 */}
      <CategoryNavigationBar />

      <div className='flex flex-col gap-[170px] my-[100px]'>
        {/* 화제의 신간 */}
        <NewBooksSlider />
        {/* 가로 2열 배너 */}
        <DualBanner />
        {/* 베스트 도서 */}
        <BestBooksSlider />
        {/* 작가와의 만남 */}
        <MeetTheAuthor />
        {/* 추천의 숲 */}
        <RecommendedBooks />
        {/* 이달의 책 */}
        <MonthlyBookPick />
        {/* 가로 3열 배너 */}
        <TripleBanner />
        {/* 놓치면 후회할 할인 도서 */}
        <SaleBooksSlider />
      </div>
    </div>
  );
}
