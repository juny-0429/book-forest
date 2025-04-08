import { useQuery } from '@tanstack/react-query';
import { CategoryProductListDto } from '../../_dtos/getCategoryProductList.dto';

export const getCategoryCodeProductListApi = async (
  categoryCode: string
): Promise<CategoryProductListDto> => {
  const response = await fetch(`/api/category/${categoryCode}`);

  if (!response.ok) throw new Error('카테고리별 상품을 불러오는 데 실패했습니다.');

  const data = await response.json();
  return data;
};

const CATEGORY_PRODUCT_LIST = 'CATEGORY_PRODUCT_LIST';

export const useGetCategoryProductList = (categoryCode: string) => {
  return useQuery<CategoryProductListDto>({
    queryKey: [CATEGORY_PRODUCT_LIST, categoryCode],
    queryFn: () => getCategoryCodeProductListApi(categoryCode),
    enabled: !!categoryCode,
  });
};
