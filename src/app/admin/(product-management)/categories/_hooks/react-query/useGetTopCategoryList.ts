import { useQuery } from '@tanstack/react-query';
import { CategoryListDto } from '../../_dtos/getCategoryList.dto';

const getTopCategoryListApi = async (): Promise<CategoryListDto[]> => {
  const response = await fetch('/api/category/top');
  if (!response.ok) throw new Error('대분류를 불러오는 데 실패했습니다.');

  const data = await response.json();
  return data.categoryList;
};

const TOP_CATEGORY_LIST = 'TOP_CATEGORY_LIST';

export const useGetTopCategoryList = () => {
  return useQuery({
    queryKey: [TOP_CATEGORY_LIST],
    queryFn: getTopCategoryListApi,
  });
};
