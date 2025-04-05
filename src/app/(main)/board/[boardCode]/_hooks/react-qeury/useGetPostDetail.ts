import { useQuery } from '@tanstack/react-query';
import { PostDetailDto } from '../../_dtos/getPostDetail.dto';

const getPostDetailApi = async (postId: number): Promise<PostDetailDto> => {
  const response = await fetch(`/api/board/detail?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`게시글을 불러오는 데 실패했습니다: ${response.status}`);
  return await response.json();
};

const POST_DETAIL = 'POST_DETAIL';

export const useGetPostDetail = (postId: number) => {
  return useQuery({
    queryKey: [POST_DETAIL, postId],
    queryFn: () => getPostDetailApi(postId),
    enabled: !!postId,
  });
};
