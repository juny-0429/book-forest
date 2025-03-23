import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCommentPayload } from '../../_schemas/comment.schema';
import { useAlertModal } from 'src/hooks/useModal';
import { CommentListDto } from '../../_dtos/getCommentList.dto';
import { useParams } from 'next/navigation';

const createCommentApi = async (data: CreateCommentPayload) => {
  const response = await fetch('/api/board/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) return new Error('댓글 등록 요청이 실패했습니다.');

  return response.json();
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { openAlertModal } = useAlertModal();
  const { postId } = useParams();

  return useMutation({
    mutationFn: createCommentApi,
    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentListDto[]>(['commentList', Number(postId)], (oldData) => {
        if (!oldData) return [newComment];

        return [...oldData, newComment];
      });
    },
    onError: () => {
      openAlertModal({
        content: '댓글 등록에 실패하였습니다.',
      });
    },
  });
};
