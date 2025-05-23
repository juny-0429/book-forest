import { useInfiniteQuery } from '@tanstack/react-query';

export const getSearchProductListApi = async (keyword: string, pageParam = 1, limit: number) => {
  const response = await fetch(`/api/home/search?keyword=${encodeURIComponent(keyword)}&page=${pageParam}&limit=${limit}`);

  if (!response.ok) throw new Error('검색 결과를 불러오는 데 실패했습니다.');

  const data = await response.json();

  return data;
};

const SEARCH_PRODUCT_LIST = 'SEARCH_PRODUCT_LIST';

export const useGetSearchProductList = (keyword: string, page = 1, limit = 3) => {
  return useInfiniteQuery({
    queryKey: [SEARCH_PRODUCT_LIST, keyword, limit],
    queryFn: ({ pageParam = 1 }) => getSearchProductListApi(keyword, pageParam, limit),
    initialPageParam: page,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, cur) => acc + cur.items.length, 0);
      return totalFetched < lastPage.totalCount ? allPages.length + 1 : undefined;
    },
    enabled: !!keyword,
  });
};
