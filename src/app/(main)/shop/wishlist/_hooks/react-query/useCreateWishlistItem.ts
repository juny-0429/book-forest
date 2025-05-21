import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlistByUserIdQueryOptions } from './useGetWhishlistByUserId';
import { wishlistCountByUserIdQueryOptions } from './useGetWishListCountByUserId';
import { wishlistItemCheckQueryOptions } from './useGetwishlistItemCheck';

export const createWishlistApi = async (userId: string, productIds: number[]): Promise<boolean> => {
  const response = await fetch(`/api/wishlist/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIds }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error ?? '찜 추가에 실패했습니다.');
  }

  return true;
};

export const useCreateWishlist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productIds: number[]) => createWishlistApi(userId, productIds),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: getWishlistByUserIdQueryOptions(userId).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: wishlistCountByUserIdQueryOptions(userId).queryKey,
      });

      if (variables.length === 1) {
        queryClient.invalidateQueries({
          queryKey: wishlistItemCheckQueryOptions(userId, variables[0]).queryKey,
        });
      }
    },
  });
};
