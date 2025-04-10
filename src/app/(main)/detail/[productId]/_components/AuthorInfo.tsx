import React from 'react';

interface AuthorInfoProps {
  authorName: string;
  authorAwards: string | null;
  authorDescription: string | null;
}

export default function AuthorInfo({ authorName, authorAwards, authorDescription }: AuthorInfoProps) {
  const awards = authorAwards?.split(',').map((item) => item.trim()) ?? [];

  return (
    <section className='pb-8 border-b border-solid border-gray-300'>
      <h3 className='mb-5 text-title-24r text-ui-text-title'>작가정보</h3>

      <dl className='flex flex-col gap-4 px-7 py-5 bg-gray-200 rounded-[15px]'>
        <div className='flex gap-3'>
          <dt className='w-[60px] whitespace-nowrap text-body-14r text-ui-text-description'>저자(글)</dt>
          <dd className='text-body-16r text-ui-text-body'>{authorName}</dd>
        </div>

        <div className='flex gap-3'>
          <dt className='w-[60px] whitespace-nowrap text-body-14r text-ui-text-description'>수상 경력</dt>

          <div className='flex flex-col gap-1'>
            {awards &&
              awards.map((award) => (
                <dd key={award} className='text-body-16r text-ui-text-body'>
                  {award}
                </dd>
              ))}
          </div>
        </div>

        <div className='flex gap-3'>
          <dt className='w-[60px] whitespace-nowrap text-body-14r text-ui-text-description'>작가 소개</dt>
          <dd className='text-body-16r text-ui-text-body'>{authorDescription}</dd>
        </div>
      </dl>
    </section>
  );
}
