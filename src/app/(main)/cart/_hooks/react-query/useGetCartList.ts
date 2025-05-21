import { useQuery } from '@tanstack/react-query';
import { CartListItemDto } from '../../_dtos/getCartList.dto';

const getCartListApi = async (cart: { productId: number; stock: number }[]): Promise<CartListItemDto[]> => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart }),
  });

  if (!response.ok) throw new Error('장바구니 상품 조회에 실패했습니다.');
  return response.json();
};

const CART_LIST = 'CART_LIST';

export const useGetCartList = (cart: { productId: number; stock: number }[], enabled = true) => {
  return useQuery({
    queryKey: [CART_LIST, cart],
    queryFn: () => getCartListApi(cart),
    enabled: enabled && cart.length > 0,
  });
};
