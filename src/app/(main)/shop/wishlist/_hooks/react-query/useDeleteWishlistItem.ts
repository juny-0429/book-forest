import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlistByUserIdQueryOptions } from './useGetWhishlistByUserId';
import { wishlistCountByUserIdQueryOptions } from './useGetWishListCountByUserId';

export const deleteWishlistApi = async (userId: string, productIds: number[]): Promise<boolean> => {
  const response = await fetch(`/api/wishlist/id?userId=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIds }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error ?? '찜 삭제에 실패했습니다.');
  }

  return true;
};

export const useDeleteWishlist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productIds: number[]) => deleteWishlistApi(userId, productIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWishlistByUserIdQueryOptions(userId).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: wishlistCountByUserIdQueryOptions(userId).queryKey,
      });
    },
  });
};
