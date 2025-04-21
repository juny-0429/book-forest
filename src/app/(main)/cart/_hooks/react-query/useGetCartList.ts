import { useQuery } from '@tanstack/react-query';
import { CartListItemDto } from '../../_dtos/getCartList.dto';

const getCartListApi = async (productIds: number[]): Promise<CartListItemDto[]> => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIds }),
  });

  if (!response.ok) throw new Error('장바구니 상품 조회에 실패했습니다.');
  return response.json();
};

const CART_LIST = 'CART_LIST';

export const useGetCartList = (productIds: number[], enabled = true) => {
  return useQuery({
    queryKey: [CART_LIST, productIds],
    queryFn: () => getCartListApi(productIds),
    enabled: enabled && productIds.length > 0,
  });
};
