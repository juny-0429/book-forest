import React from 'react';
import ReturnPolicy from './_components/ReturnPolicy';
import AuthorInfo from './_components/AuthorInfo';
import BookInfo from './_components/BookInfo';
import Review from './_components/Review';
import PaymentBox from './_components/PaymentBox';

export default function DetailPage() {
  return (
    <div>
      상세페이지
      {/* 책정보 */}
      <BookInfo />
      {/* 작가정보 */}
      <AuthorInfo />
      {/* 교환/반품/품절 안내 */}
      <ReturnPolicy />
      {/* 리뷰 */}
      <Review />
      {/* 결제 창 */}
      <PaymentBox price={20000} discount={10} />
    </div>
  );
}
