import { BoardCategoryType } from 'src/types/boardCategory.types';
import { GetPostItemDto } from '../../_dtos/getPostList.dto';
import { useQuery } from '@tanstack/react-query';

const getPostListApi = async (boardCode: BoardCategoryType, keyword?: string): Promise<GetPostItemDto[]> => {
  const response = await fetch(`/api/board?boardCode=${boardCode}&keyword=${keyword}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`게시글을 불러오는 데 실패했습니다: ${response.status}`);
  return await response.json();
};

const POST_LIST = 'POST_LIST';

export const useGetPostList = (boardCode: BoardCategoryType, keyword?: string) => {
  return useQuery({
    queryKey: [POST_LIST, boardCode, keyword],
    queryFn: () => getPostListApi(boardCode, keyword),
    enabled: !!boardCode && (!keyword || keyword.trim().length === 0 || keyword.trim().length >= 2),
  });
};
