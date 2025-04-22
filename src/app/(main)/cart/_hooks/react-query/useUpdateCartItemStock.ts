import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateCartItemDto } from '../../_dtos/upateCartItem.dto';
import { getCartListByUserIdQueryOptions } from './useGetCartListByUserId';
import { CartListItemDto } from '../../_dtos/getCartList.dto';

const updateCartItemStock = async ({ userId, productId, stock }: UpdateCartItemDto) => {
  const response = await fetch(`/api/cart/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, stock }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '장바구니 수량 변경에 실패했습니다.');
  }

  return response.json();
};

export const useUpdateCartItemStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemStock,
    onSuccess: (_, variables: UpdateCartItemDto) => {
      queryClient.setQueryData<CartListItemDto[]>(getCartListByUserIdQueryOptions(variables.userId).queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.map((item) => (item.productId === variables.productId ? { ...item, stock: variables.stock } : item));
      });
    },
  });
};
