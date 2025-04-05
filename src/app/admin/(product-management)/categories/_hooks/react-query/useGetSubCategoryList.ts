import { useQuery } from '@tanstack/react-query';
import { CategoryListDto } from '../../_dtos/getCategoryList.dto';

const getSubCategoryListApi = async (parentCode: string): Promise<CategoryListDto[]> => {
  const response = await fetch(`/api/category/sub?parentCode=${parentCode}`);
  if (!response.ok) throw new Error('중분류를 불러오는 데 실패했습니다.');

  const data = await response.json();
  return data.categoryList;
};

const SUB_CATEGORY_LIST = 'SUB_CATEGORY_LIST';

export const useGetSubCategoryList = (parentCode: string) => {
  return useQuery({
    queryKey: [SUB_CATEGORY_LIST, parentCode],
    queryFn: () => getSubCategoryListApi(parentCode),
    enabled: !!parentCode,
  });
};
