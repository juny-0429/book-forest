import React from 'react';
import ReturnPolicy from './_components/ReturnPolicy';
import AuthorInfo from './_components/AuthorInfo';
import BookInfo from './_components/BookInfo';
import Review from './_components/Review';
import PaymentBox from './_components/PaymentBox';
import BookPriceInfo from './_components/BookPriceInfo';

export default function DetailPage() {
  return (
    <div className='flex flex-col gap-16'>
      {/* 상세페이지 정보 */}
      <BookPriceInfo />
      상세페이지
      {/* 책정보 */}
      <BookInfo />
      {/* 작가정보 */}
      <AuthorInfo />
      {/* 리뷰 */}
      <Review />
      {/* 교환/반품/품절 안내 */}
      <ReturnPolicy />
      {/* 결제 창 */}
      <PaymentBox price={20000} discount={10} />
    </div>
  );
}
