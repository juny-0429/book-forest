'use client';

import React from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import { useGetPostDetail } from '../_hooks/react-qeury/useGetPostDetail';
import { useParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { copyToClipboard } from 'src/utils/copyToClipboard';
import { useGetCommentList } from '../_hooks/react-qeury/useGetCommentList';

export default function BoardDetailPage() {
  const router = useRouter();
  const { boardCode, postId } = useParams();
  const { data: postData } = useGetPostDetail(Number(postId));

  const { postTitle, postContent, accountId, createAt } = postData || {};

  const { data: commentList } = useGetCommentList(Number(postId));

  console.log('commentList = ', commentList);

  return (
    <div className='flex flex-col gap-5'>
      <section className='flex flex-col gap-2'>
        <h2 className='text-title-24b text-ui-text-title'>{postTitle}</h2>

        <div className='flex flex-col gap-2'>
          <span className='text-body-16r text-ui-text-description'>작성자: {accountId}</span>
          <time className='text-body-16r text-ui-text-description'>작성일: {dayjs(createAt).format('YYYY/MM/DD HH:mm')}</time>
        </div>
      </section>

      <hr className='w-full h-[1px] bg-gray-600' />

      <section className='flex flex-col gap-5 p-3'>
        <p className='text-body-16r text-ui-text-title whitespace-pre-line'>{postContent}</p>

        <div className='flex justify-center items-center gap-1 w-full'>
          <LineButton height={40} className='w-fit' leftIcon={<LucideIcons.Menu size={20} />} onClick={() => router.push(`/board/${boardCode}`)}>
            목록으로 가기
          </LineButton>
          <LineButton height={40} className='w-fit' leftIcon={<LucideIcons.Share2 size={20} />} onClick={() => copyToClipboard(window.location.href)}>
            공유하기
          </LineButton>
        </div>
      </section>

      <hr className='w-full h-[1px] bg-gray-600' />

      <section className='flex flex-col gap-4'>
        <form className='flex justify-center items-center gap-2'>
          <TextInput placeholder='욕설 및 부적절한 내용은 노출에서 제외될 수 있습니다.' />
          <Button height={48} className='w-[100px]'>
            등록
          </Button>
        </form>

        {/* 댓글 */}
        <div>
          <ul className='flex flex-col gap-5'>
            {commentList &&
              commentList.map((comment) => (
                <li key={comment.commentId} className='flex flex-col gap-3'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='text-body-16r text-ui-text-description'>{comment.accountId}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <time className='text-body-16r text-ui-text-description'>{dayjs(comment.createAt).format('YYYY/MM/DD HH:mm')}</time>
                    </div>

                    <p className='text-body-16m text-ui-text-title'>{comment.commentContent}</p>
                  </div>

                  <ul>
                    {comment.replies.map((replyComment) => (
                      <li key={replyComment.commentId} className='flex gap-1'>
                        <LucideIcons.CornerDownRight size={20} className='text-gray-800' />
                        <div>
                          <div className='flex items-center gap-2'>
                            <span className='text-body-16r text-ui-text-description'>{replyComment.accountId}</span>
                            <hr className='w-[1px] h-2 bg-gray-600' />
                            <time className='text-body-16r text-ui-text-description'>{dayjs(replyComment.createAt).format('YYYY/MM/DD HH:mm')}</time>
                          </div>

                          <p className='text-body-16m text-ui-text-title'>{replyComment.commentContent}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
