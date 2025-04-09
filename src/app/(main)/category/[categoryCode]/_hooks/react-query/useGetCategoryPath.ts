import { useQuery } from '@tanstack/react-query';
import { CategoryPathItem } from '../../_dtos/getCategorypath.dto';

const getCategoryPathApi = async (categoryCode: string): Promise<CategoryPathItem[]> => {
  const response = await fetch(`/api/category/path?categoryCode=${categoryCode}`);
  if (!response.ok) {
    throw new Error('카테고리 경로를 불러오는 데 실패했습니다.');
  }
  const data = await response.json();
  return data.categoryPath;
};

const CATEGORY_PATH = 'CATEGORY_PATH';

export const useGetCategoryPath = (categoryCode: string) => {
  return useQuery<CategoryPathItem[]>({
    queryKey: [CATEGORY_PATH, categoryCode],
    queryFn: () => getCategoryPathApi(categoryCode),
    enabled: !!categoryCode,
  });
};
