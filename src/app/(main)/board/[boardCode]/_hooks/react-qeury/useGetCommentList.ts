import { useQuery } from '@tanstack/react-query';
import { CommentListDto } from '../../_dtos/getCommentList.dto';

const getCommentListApi = async (postId: number): Promise<CommentListDto[]> => {
  const response = await fetch(`/api/board/comment?postId=${postId}`);
  if (!response.ok) throw new Error('댓글을 불러오는 데 실패했습니다.');

  const data = await response.json();

  return data.commentList;
};

export const useGetCommentList = (postId: number) => {
  return useQuery({
    queryKey: ['commentList', postId],
    queryFn: () => getCommentListApi(postId),
    enabled: !!postId,
  });
};
