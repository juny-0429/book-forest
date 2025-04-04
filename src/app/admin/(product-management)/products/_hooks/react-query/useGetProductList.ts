import { useQuery } from '@tanstack/react-query';

const getProductListApi = async (page: number) => {
  const response = await fetch(`/api/product/admin?page=${page}`);
  if (!response.ok) throw new Error('상품 리스트를 불러오는 데 실패했습니다.');

  const data = await response.json();
  return data;
};

export const useGetProductList = (page: number) => {
  return useQuery({
    queryKey: ['productList', page],
    queryFn: () => getProductListApi(page),
  });
};
