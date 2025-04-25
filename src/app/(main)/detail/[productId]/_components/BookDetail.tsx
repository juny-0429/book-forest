import Image from 'next/image';
import React from 'react';

interface BookDetailImageListProps {
  detailImageList: string[];
}

export default function BookDetailImageList({ detailImageList }: BookDetailImageListProps) {
  return (
    <div className='flex flex-col items-center w-full h-full pb-8 border-b border-solid border-gray-300'>
      {detailImageList && detailImageList.map((image) => <Image src={image} key={image} width={900} height={400} alt='detail image' />)}
    </div>
  );
}
