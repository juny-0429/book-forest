import React from 'react';

interface BookInfoProps {
  productSummary: string;
}

export default function BookInfo({ productSummary }: BookInfoProps) {
  return (
    <section className='pb-8 border-b border-solid border-gray-300'>
      <h3 className='mb-5 text-title-24r text-ui-text-title'>책 소개</h3>

      <p className='text-body-18r text-ui-text-title whitespace-pre-line'>{productSummary}</p>
    </section>
  );
}
