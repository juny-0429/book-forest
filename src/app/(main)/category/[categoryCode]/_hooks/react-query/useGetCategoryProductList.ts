import { useInfiniteQuery } from '@tanstack/react-query';

export const getCategoryCodeProductListApi = async (categoryCode: string, pageParam = 1, limit: number) => {
  const response = await fetch(`/api/category/${categoryCode}?page=${pageParam}&limit=${limit}`);

  if (!response.ok) throw new Error('카테고리별 상품을 불러오는 데 실패했습니다.');

  const data = await response.json();
  return data;
};

const CATEGORY_PRODUCT_LIST = 'CATEGORY_PRODUCT_LIST';

export const useGetCategoryProductList = (categoryCode: string, page = 1, limit = 10) => {
  return useInfiniteQuery({
    queryKey: [CATEGORY_PRODUCT_LIST, categoryCode, limit],
    queryFn: ({ pageParam = 1 }) => getCategoryCodeProductListApi(categoryCode, pageParam, limit),
    initialPageParam: page,
    getNextPageParam: (lastPage) => lastPage.paginationMeta.nextPage ?? undefined,
    enabled: !!categoryCode,
  });
};
