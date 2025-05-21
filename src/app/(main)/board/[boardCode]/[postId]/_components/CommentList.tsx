'use client';

import React from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import { useGetCommentList } from '../../_hooks/react-qeury/useGetCommentList';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import LucideIcons from 'src/theme/lucideIcon';
import TextButton from 'src/components/Button/TextButton';
import { useAuth } from 'src/provider/authProvider';
import { useDeleteComment } from '../../_hooks/react-qeury/useDeleteComment';
import { useConfirmModal } from 'src/hooks/useModal';

export default function CommentList() {
  const { postId } = useParams();
  const { user } = useAuth();
  const { data: commentList } = useGetCommentList(Number(postId));
  const { mutate: deleteComment } = useDeleteComment();
  const { openConfirmModal } = useConfirmModal();

  const onDeleteComment = (commentId: number) => {
    openConfirmModal({
      title: '댓글 삭제',
      content: '정말로 이 댓글을 삭제하시겠습니까?',
      confirmButtonText: '삭제',
      onConfirm: () => deleteComment(commentId),
      onCancel: () => {},
    });
  };

  return (
    <section>
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

                <div className='flex items-center'>
                  <p className='text-body-16m text-ui-text-title'>{comment.commentContent}</p>
                  {user?.id === comment.userId && (
                    <TextButton height={32} onClick={() => onDeleteComment(comment.commentId)}>
                      삭제
                    </TextButton>
                  )}
                </div>
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
    </section>
  );
}
