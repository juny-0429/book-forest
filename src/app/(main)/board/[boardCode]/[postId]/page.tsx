'use client';

import React from 'react';
import { useGetPostDetail } from '../_hooks/react-qeury/useGetPostDetail';
import { useParams } from 'next/navigation';
import CommentList from './_components/CommentList';
import PostContent from './_components/PostContent';
import PostTitle from './_components/PostTitle';
import CommentForm from './_components/CommentForm';

export default function BoardDetailPage() {
  const { postId } = useParams();
  const { data: postData } = useGetPostDetail(Number(postId));

  if (!postData) return null;

  return (
    <div className='flex flex-col gap-5'>
      <PostTitle postData={postData} />
      <PostContent postContent={postData.postContent} />

      <div className='flex flex-col gap-4'>
        <CommentForm />
        <CommentList />
      </div>
    </div>
  );
}
