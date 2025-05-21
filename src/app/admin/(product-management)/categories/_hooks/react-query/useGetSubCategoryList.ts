import { useQuery } from '@tanstack/react-query';
import { CategoryListDto } from '../../_dtos/getCategoryList.dto';

const getSubCategoryListApi = async (parentName: string): Promise<CategoryListDto[]> => {
  const response = await fetch(`/api/category/sub?parentName=${parentName}`);
  if (!response.ok) throw new Error('중분류를 불러오는 데 실패했습니다.');

  const data = await response.json();
  return data.categoryList;
};

const SUB_CATEGORY_LIST = 'SUB_CATEGORY_LIST';

export const useGetSubCategoryList = (parentName: string) => {
  return useQuery({
    queryKey: [SUB_CATEGORY_LIST, parentName],
    queryFn: () => getSubCategoryListApi(parentName),
    enabled: !!parentName,
  });
};
