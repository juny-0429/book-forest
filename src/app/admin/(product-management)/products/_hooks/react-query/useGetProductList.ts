import { useQuery } from '@tanstack/react-query';

const getProductListApi = async (page: number, searchType: string, keyword: string) => {
  const response = await fetch(`/api/product/admin?page=${page}&searchType=${searchType}&keyword=${keyword}`);
  if (!response.ok) throw new Error('상품 리스트를 불러오는 데 실패했습니다.');

  return await response.json();
};

export const useGetProductList = (page: number, searchType: string, keyword: string) => {
  return useQuery({
    queryKey: ['productList', page, searchType, keyword],
    queryFn: () => getProductListApi(page, searchType, keyword),
  });
};
