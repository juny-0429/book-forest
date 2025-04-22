import { useQuery } from '@tanstack/react-query';

export const getWishListCountByUserId = async (userId: string): Promise<number> => {
  const res = await fetch(`/api/wishlist/${userId}/count`, {
    next: { tags: ['cart'] },
  });

  if (!res.ok) throw new Error('찜하기 개수 조회 실패');

  const data = await res.json();
  return data.count;
};

const WISHLIST_COUNT = 'WISHLIST_COUNT';

export const useWishListCountByUserId = (userId: string) => {
  return useQuery({
    queryKey: [WISHLIST_COUNT, userId],
    queryFn: () => getWishListCountByUserId(userId),
    enabled: !!userId,
  });
};
