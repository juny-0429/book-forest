'use client';

import React from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import { useGetCommentList } from '../../_hooks/react-qeury/useGetCommentList';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import LucideIcons from 'src/theme/lucideIcon';

export default function CommentList() {
  const { postId } = useParams();
  const { data: commentList } = useGetCommentList(Number(postId));

  return (
    <section className='flex flex-col gap-4'>
      <form className='flex justify-center items-center gap-2'>
        <TextInput placeholder='욕설 및 부적절한 내용은 노출에서 제외될 수 있습니다.' />
        <Button height={48} className='w-[100px]'>
          등록
        </Button>
      </form>

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

                <ul className='flex flex-col gap-5'>
                  {comment.replies.map((replyComment) => (
                    <li key={replyComment.commentId} className='flex gap-2'>
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
  );
}
