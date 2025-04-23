import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlistByUserIdQueryOptions } from './useGetWhishlistByUserId';
import { WishlistItemDto } from '../../_dtos/GetWhislistItem.dto';

export const createWishlistItemApi = async (userId: string, productId: string): Promise<boolean> => {
  const response = await fetch(`/api/wishlist/${userId}?productId=${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('찜 추가에 실패했습니다.');
  }

  return response.json();
};

export const useCreateWishlistItem = (userId: string, productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createWishlistItemApi(userId, productId),
    onSuccess: (newItem) => {
      queryClient.setQueryData(getWishlistByUserIdQueryOptions(userId).queryKey, (oldData: WishlistItemDto[] | undefined) => {
        if (!oldData) return [newItem];
        return [...oldData, newItem];
      });
    },
  });
};
