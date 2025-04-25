import { useQuery } from '@tanstack/react-query';

export const getCartCountByUserId = async (userId: string): Promise<number> => {
  const res = await fetch(`/api/cart/${userId}/count`, {
    next: { tags: ['cart'] },
  });

  if (!res.ok) throw new Error('장바구니 개수 조회 실패');

  const data = await res.json();
  return data.count;
};

const CART_COUNT = 'CART_COUNT';

export const useCartCountByUserId = (userId: string) => {
  return useQuery({
    queryKey: [CART_COUNT, userId],
    queryFn: () => getCartCountByUserId(userId),
    enabled: !!userId,
  });
};
