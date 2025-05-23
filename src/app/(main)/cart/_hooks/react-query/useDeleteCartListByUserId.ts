import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartListByUserIdQueryOptions } from './useGetCartListByUserId';
import { CartListItemDto } from '../../_dtos/getCartList.dto';
import { DeleteCartItemDto } from '../../_dtos/deleteCartItem.dto';

const deleteCartListByUserId = async ({ userId, productIds }: DeleteCartItemDto) => {
  const response = await fetch(`/api/cart/user?userId=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIds }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '장바구니 상품 삭제에 실패했습니다.');
  }

  return response.json();
};

export const useDeleteCartListByUserId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartListByUserId,
    onSuccess: (_, variables: DeleteCartItemDto) => {
      queryClient.setQueryData<CartListItemDto[]>(getCartListByUserIdQueryOptions(variables.userId).queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((item) => !variables.productIds.includes(item.productId));
      });
    },
  });
};
