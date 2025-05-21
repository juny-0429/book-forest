import { BoardCategoryType } from 'src/types/boardCategory.types';
import { PostListDto } from '../../_dtos/getPostList.dto';
import { useQuery } from '@tanstack/react-query';

const getPostListApi = async (boardCode: BoardCategoryType): Promise<PostListDto[]> => {
  const response = await fetch(`/api/board?boardCode=${boardCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`게시글을 불러오는 데 실패했습니다: ${response.status}`);
  return await response.json();
};

const POST_LIST = 'POST_LIST';

export const useGetPostList = (boardCode: BoardCategoryType) => {
  return useQuery({
    queryKey: [POST_LIST, boardCode],
    queryFn: () => getPostListApi(boardCode),
    enabled: !!boardCode,
  });
};
