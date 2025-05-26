import { useQuery } from '@tanstack/react-query';
import { BoardCategoryItemDto } from '../../_dtos/getBoardCategoryItem.dto';

const getBoardCategoryApi = async (): Promise<BoardCategoryItemDto[]> => {
  const response = await fetch('/api/board/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`카테고리 정보를 불러오는 데 실패했습니다: ${response.status}`);
  return await response.json();
};

const BOARD_CATEGORY = 'BOARD_CATEGORY';

export const useGetBoardCategory = () => {
  return useQuery({
    queryKey: [BOARD_CATEGORY],
    queryFn: getBoardCategoryApi,
  });
};
