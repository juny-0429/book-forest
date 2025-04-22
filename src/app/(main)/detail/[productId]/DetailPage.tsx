'use client';

import React from 'react';
import ReturnPolicy from './_components/ReturnPolicy';
import AuthorInfo from './_components/AuthorInfo';
import BookInfo from './_components/BookInfo';
import Review from './_components/Review';
import PaymentBox from './_components/PaymentBox';
import BookPriceInfo from './_components/BookPriceInfo/BookPriceInfo';
import { useGetProductDetail } from './_hooks/react-query/useGetProductDetail';
import BookHeader from './_components/BookHeader';
import BookDetailImageList from './_components/BookDetail';
import { useParams } from 'next/navigation';

export default function DetailPage() {
  const { productId } = useParams();

  const { data: productDetail } = useGetProductDetail(Number(productId));

  if (!productDetail) return null;

  const {
    productId: ids,
    productName,
    productSummary,
    authorName,
    authorAwards,
    authorDescription,
    badgeNames,
    categoryName,
    publisher,
    price,
    discount,
    deliveryPrice,
    publishedDate,
    mainImages,
    detailImages,
  } = productDetail ?? {};

  return (
    <div className='flex flex-col gap-16'>
      {/* 상세페이지 정보 */}
      <BookHeader productName={productName} authorName={authorName} publisher={publisher} publishedDate={publishedDate} />
      <BookPriceInfo price={price} discount={discount} deliveryPrice={deliveryPrice} mainImageList={mainImages} badges={badgeNames} />
      {/* 상세페이지 */}
      <BookDetailImageList detailImageList={detailImages} />
      {/* 책정보 */}
      <BookInfo productSummary={productSummary} />
      {/* 작가정보 */}
      <AuthorInfo authorName={authorName} authorAwards={authorAwards} authorDescription={authorDescription} />
      {/* 리뷰 */}
      <Review />
      {/* 교환/반품/품절 안내 */}
      <ReturnPolicy />
      {/* 결제 창 */}
      <PaymentBox productId={Number(productId)} price={price} discount={discount} />
    </div>
  );
}
