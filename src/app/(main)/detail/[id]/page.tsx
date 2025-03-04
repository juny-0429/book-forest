import React from 'react';
import ReturnPolicy from './_components/ReturnPolicy';
import AuthorInfo from './_components/AuthorInfo';
import BookInfo from './_components/BookInfo';

export default function page() {
  return (
    <div>
      상세페이지
      {/* 책정보 */}
      <BookInfo />
      {/* 작가정보 */}
      <AuthorInfo />
      {/* 교환/반품/품절 안내 */}
      <ReturnPolicy />
    </div>
  );
}
