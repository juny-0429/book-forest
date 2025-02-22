import React from 'react';
import SectionTitle from './SectionTitle';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import Image from 'next/image';

export default function RecommendedBooks() {
  const mockBookList = Array.from({ length: 10 }, (_, index) => ({
    id: `${index + 1}`,
    title: '새 마음으로',
    category: '산문',
    author: '이슬아',
    publisher: '헤엄',
    price: 15000,
    discount: 10,
    preview:
      '[Page. 155] 배운 게 별로 없었지만 실은 모든 것을 알고 있었던 존자 씨와 병찬 씨. 그들의 생애는 서로를 살리며 흘러왔다. 한 고생이 끝나면 다음 고생이 있는 생이었다. 어떻게 자라야겠다고 다짐할 새도 없이 자라버리는 시간이었다. 고단한 생로병사 속에서 태어나고 만난 당신들, 내 엄마를 낳은 당신들, 해가 지면 저녁상을 차리고...배운 게 별로 없었지만 실은 모든 것을 알고 있었던 존자 씨와 병찬 씨. 그들의 생애는 서로를 살리며 흘러왔다.한 고생이 끝나면 다음 고생이 있는 생이었다. 어떻게 자라야겠다고 다짐할 새도 없이 자라버리는 시간이었다. 고단한 생로병사 속에서 태어나고 만난 당신들, 내 엄마를 낳은 당신들, 해가 지면 저녁상을 차리고...',
    bookImage: SampleBookImg,
  }));

  return (
    <section className='flex flex-col gap-10 w-full'>
      <SectionTitle title='추천의 숲' description='책숲이 전하는 강력 추천 도서' />

      <div className='grid grid-cols-5 gap-auto gap-y-[50px]'>
        {mockBookList &&
          mockBookList.map((book) => (
            <article key={book.id} className='flex flex-col gap-[30px]'>
              <div className='relative group w-[180px]'>
                <Image src={book.bookImage} alt='book image' className='book-item' />

                <div className='absolute inset-0 flex flex-col justify-center gap-[10px] w-[180px] p-[10px] opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60 transition-all duration-300'>
                  <p className='text-body-16b text-white'>책속에서</p>
                  <p className='h-full text-caption-10r text-white line-clamp-[12] overflow-hidden'>{book.preview}</p>
                  <p className='w-full text-end text-body-18b text-saffron-200'>{book.price.toLocaleString()}원</p>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-body-14r text-ui-text-description'>{book.category}</p>

                <p className='text-title-16b text-ui-text-title'>{book.title}</p>

                <div className='flex items-center gap-2'>
                  <span className='text-body-16r text-ui-text-title'>{book.author}</span>
                  <hr className='w-[2px] h-[10px] bg-gray-600' />
                  <span className='text-body-16r text-ui-text-title'>{book.publisher}</span>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
