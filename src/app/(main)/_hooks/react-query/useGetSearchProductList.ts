import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getSearchBarProductListApi = async (keyword: string, page: number = 1, limit: number = 4) => {
  const response = await fetch(`/api/home/search-bar?keyword=${keyword}&page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('검색 상품 조회에 실패했습니다.');
  const result = await response.json();
  return result;
};

const SEARCH_BAR_PRODUCT_LIST = 'SEARCH_BAR_PRODUCT_LIST';

export const useGetSearchBarProductList = (keyword: string, page: number = 1, limit: number = 4) => {
  return useQuery({
    queryKey: [SEARCH_BAR_PRODUCT_LIST, keyword, page, limit],
    queryFn: () => getSearchBarProductListApi(keyword, page, limit),
    enabled: !!keyword,
    placeholderData: keepPreviousData,
  });
};
