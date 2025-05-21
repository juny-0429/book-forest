'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SectionTitle from './SectionTitle';
import { useGetMeetAuthor } from '../_hooks/react-query/useGetMeetAuthor';

export default function MeetTheAuthor() {
  const { data: meetAuthorList } = useGetMeetAuthor('김초엽,이슬아,박준');

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='작가와의 만남' description='책숲이 소개하는 이달의 특별한 작가' />

      <div className='flex justify-center items-center'>
        {meetAuthorList &&
          meetAuthorList.map((author, index) => (
            <Link href='#' key={author.authorId}>
              {/* todo: 작가 클릭 시 작가 이름으로 검색 결과로 이동 */}
              <div className={`relative group size-fit p-[30px] bg-gray-200 rounded-full ${index === 0 ? '' : 'ml-[-30px]'}`}>
                {author.authorProfileUrl && <Image src={author.authorProfileUrl} width={250} height={250} alt='author' className='rounded-full' />}

                <p className='absolute top-[30px] left-[30px] flex justify-center items-center size-[250px] p-[30px] text-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60 transition-all duration-300 rounded-full'>
                  {author.authorDescription}, {author.authorName}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
