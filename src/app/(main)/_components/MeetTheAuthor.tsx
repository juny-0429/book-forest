import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SampleAuthorImg from '@/assets/images/author/이슬아.png';
import SectionTitle from './SectionTitle';

export default function MeetTheAuthor() {
  const mockAuthorList = Array.from({ length: 3 }, (_, index) => ({
    id: `${index + 1}`,
    name: '이슬아',
    description: '일상과 관계를 섬세하게 그려내는 작가, 이슬아',
    bookImage: SampleAuthorImg,
  }));

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='작가와의 만남' description='책숲이 소개하는 이달의 특별한 작가' />

      <div className='flex justify-center items-center'>
        {mockAuthorList &&
          mockAuthorList.map((author, intex) => (
            <Link href='#' key={author.id}>
              {/* todo: 작가 클릭 시 작가 이름으로 검색 결과로 이동 */}
              <div className={`relative group size-fit p-[30px] bg-gray-200 rounded-full ${intex === 0 ? '' : 'ml-[-30px]'}`}>
                <Image src={author.bookImage} width={300} alt='author' className='rounded-full' />

                <p className='absolute top-[30px] left-[30px] flex justify-center items-center size-[300px] p-[30px] text-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60 transition-all duration-300 rounded-full'>
                  {author.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
