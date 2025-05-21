import dayjs from 'dayjs';
import React from 'react';
import { PostDetailDto } from '../../_dtos/getPostDetail.dto';

interface PostTitleProps {
  postData: PostDetailDto;
}

export default function PostTitle({ postData }: PostTitleProps) {
  const { postTitle, accountId, createAt } = postData;

  return (
    <section className='flex flex-col gap-2 pb-5 border-b border-solid border-gray-300'>
      <h2 className='text-title-24b text-ui-text-title'>{postTitle}</h2>

      <div className='flex flex-col gap-2'>
        <span className='text-body-16r text-ui-text-description'>작성자: {accountId}</span>
        <time className='text-body-16r text-ui-text-description'>작성일: {dayjs(createAt).format('YYYY/MM/DD HH:mm')}</time>
      </div>
    </section>
  );
}
