import { useQuery } from '@tanstack/react-query';
import { WishlistItemDto } from '../../_dtos/GetWhislistItem.dto';

export const getWishlistByUserId = async (userId: string): Promise<WishlistItemDto[]> => {
  const response = await fetch(`/api/wishlist/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('찜하기 목록을 불러오는데 실패했습니다.');
  return await response.json();
};

const WISHLIST_BY_USER_ID = 'WISHLIST_BY_USER_ID';

export const getWishlistByUserIdQueryOptions = (userId: string) => ({
  queryKey: [WISHLIST_BY_USER_ID, userId],
  queryFn: () => getWishlistByUserId(userId),
  enabled: !!userId,
});

export const useWishlistByUserId = (userId: string) => {
  return useQuery(getWishlistByUserIdQueryOptions(userId));
};
