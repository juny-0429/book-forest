import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAlertModal } from "src/hooks/useModal";
import { CommentListDto } from "../../_dtos/getCommentList.dto";

const deleteCommentApi = async (commentId: number) => {
  const response = await fetch(`/api/board/comment?commentId=${commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('댓글 삭제 요청이 실패했습니다.');

  return response.json();
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { openAlertModal } = useAlertModal();
  const { postId } = useParams();

  return useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<CommentListDto[]>(['commentList', Number(postId)], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((comment) => comment.commentId !== commentId);
      });
    },
    onError: () => {
      openAlertModal({
        content: '댓글 삭제에 실패하였습니다.',
      });
    },
  });
};
