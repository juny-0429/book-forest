import { useQuery } from '@tanstack/react-query';

export const getWishListCountByUserId = async (userId: string): Promise<number> => {
  const res = await fetch(`/api/wishlist/id/count?userId=${userId}`, {
    next: { tags: ['cart'] },
  });

  if (!res.ok) throw new Error('찜하기 개수 조회 실패');

  const data = await res.json();
  return data.count;
};

const WISHLIST_COUNT = 'WISHLIST_COUNT';

export const wishlistCountByUserIdQueryOptions = (userId: string) => ({
  queryKey: [WISHLIST_COUNT, userId],
  queryFn: () => getWishListCountByUserId(userId),
  enabled: !!userId,
});

export const useWishListCountByUserId = (userId: string) => {
  return useQuery(wishlistCountByUserIdQueryOptions(userId));
};
