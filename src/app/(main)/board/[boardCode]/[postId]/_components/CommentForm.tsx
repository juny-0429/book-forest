import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import { useAlertModal } from 'src/hooks/useModal';
import { useAuth } from 'src/provider/authProvider';
import { commentSchema, CommentSchema } from '../../_schemas/comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateComment } from '../../_hooks/react-qeury/useCreateComment';
import { useParams } from 'next/navigation';

export default function CommentForm() {
  const { user, loading } = useAuth();
  const { openAlertModal } = useAlertModal();
  const { mutate: createComment } = useCreateComment();
  const { postId } = useParams();

  const { register, handleSubmit, reset } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: CommentSchema) => {
    if (!user) {
      openAlertModal({
        title: '로그인이 필요합니다.',
        content: '댓글을 작성하려면 먼저 로그인해주세요.',
      });

      return;
    }

    createComment(
      { ...data, postId: Number(postId) },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center gap-2'>
        <TextInput {...register('commentContent')} disabled={!user} placeholder='욕설 및 부적절한 내용은 노출에서 제외될 수 있습니다.' />

        <Button type='submit' height={48} className='w-[100px]'>
          등록
        </Button>
      </form>
    </section>
  );
}
