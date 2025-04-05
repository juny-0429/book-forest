import { useQuery } from '@tanstack/react-query';
import { CommentListDto } from '../../_dtos/getCommentList.dto';

const getCommentListApi = async (postId: number): Promise<CommentListDto[]> => {
  const response = await fetch(`/api/board/comment?postId=${postId}`);
  if (!response.ok) throw new Error('댓글을 불러오는 데 실패했습니다.');

  const data = await response.json();

  return data.commentList;
};

const COMMENT_LIST = 'COMMENT_LIST';

export const getCommentListQueryOptions = (postId: number) => ({
  queryKey: [COMMENT_LIST, postId],
  queryFn: () => getCommentListApi(postId),
  enabled: !!postId,
});

export const useGetCommentList = (postId: number) => {
  return useQuery(getCommentListQueryOptions(postId));
};
