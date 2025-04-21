import { useQuery } from '@tanstack/react-query';

const getCartListByUserIdApi = async (userId: string) => {
  const response = await fetch(`/api/cart/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('장바구니 상품 조회에 실패했습니다.');
  return response.json();
};

const CART_LIST_BY_USER_ID = 'CART_LIST_BY_USER_ID';

export const useGetCartListByUserId = (userId: string) => {
  return useQuery({
    queryKey: [CART_LIST_BY_USER_ID, userId],
    queryFn: () => getCartListByUserIdApi(userId),
    enabled: !!userId,
  });
};
