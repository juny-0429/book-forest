import { useQuery } from '@tanstack/react-query';

export const getWishlistItemCheck = async (userId: string, productId: number): Promise<boolean> => {
  const res = await fetch(`/api/wishlist/id/check?userId=${userId}&productId=${productId}`);
  if (!res.ok) {
    throw new Error('찜 여부 확인에 실패했습니다.');
  }
  const data = await res.json();
  return data.isWished as boolean;
};

const WISHLIST_ITEM_CHECK = 'WISHLIST_ITEM_CHECK';

export const wishlistItemCheckQueryOptions = (userId: string, productId: number) => ({
  queryKey: [WISHLIST_ITEM_CHECK, userId, productId],
  queryFn: () => getWishlistItemCheck(userId, productId),
  enabled: !!userId && !!productId,
});

export const useWishlistItemCheck = (userId: string, productId: number) => {
  return useQuery(wishlistItemCheckQueryOptions(userId, productId));
};
