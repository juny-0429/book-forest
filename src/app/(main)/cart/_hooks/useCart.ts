import { useAuth } from 'src/provider/authProvider';
import { useCreateCartListByUserId } from './react-query/useCreateCartListByUserId';
import { useDeleteCartListByUserId } from './react-query/useDeleteCartListByUserId';
import { toastMessage } from 'src/hooks/useToast';
import { useUpdateCartItemStock } from './react-query/useUpdateCartItemStock';

export interface CartItemType {
  productId: number;
  stock: number;
}

export const useCart = () => {
  const { user } = useAuth();
  const { mutate: createCartListByUserId } = useCreateCartListByUserId();
  const { mutate: deleteCartListByUserId } = useDeleteCartListByUserId();
  const { mutate: updateCartItemStock } = useUpdateCartItemStock();

  const CART_KEY = 'guest_cart';
  const EXPIRE_KEY = 'guest_cart_expire';
  const EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24시간

  const isExpired = () => {
    const expire = localStorage.getItem(EXPIRE_KEY);
    return !expire || Date.now() > Number(expire);
  };

  const getCart = (): CartItemType[] => {
    if (typeof window === 'undefined') return [];
    if (isExpired()) {
      clearCart();
      return [];
    }
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveCart = (items: CartItemType[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.setItem(EXPIRE_KEY, String(Date.now() + EXPIRE_TIME));
  };

  const addToCart = (items: CartItemType[]) => {
    if (user) {
      createCartListByUserId(
        {
          userId: user.id,
          cart: items,
        },
        {
          onSuccess: () => {
            toastMessage({
              title: '장바구니 추가 완료',
              content: '상품이 장바구니에 추가되었습니다.',
              type: 'success',
            });
          },
        }
      );
    } else {
      const cart = getCart();

      items.forEach((item) => {
        const exists = cart.find((i) => i.productId === item.productId);

        if (exists) {
          exists.stock += item.stock;
        } else {
          cart.push(item);
        }
      });

      saveCart(cart);

      toastMessage({
        title: '장바구니 추가 완료',
        content: '상품이 장바구니에 추가되었습니다.',
        type: 'success',
      });
    }
  };

  const removeFromCart = (productIdOrIds: number | number[]) => {
    const productIds = Array.isArray(productIdOrIds) ? productIdOrIds : [productIdOrIds];
    if (user) {
      deleteCartListByUserId(
        {
          userId: user.id,
          productIds,
        },
        {
          onSuccess: () => {
            toastMessage({
              title: '장바구니 상품 삭제',
              content: '상품이 장바구니에서 삭제되었습니다.',
              type: 'success',
            });
          },
        }
      );
    } else {
      const updated = getCart().filter((item) => !productIds.includes(item.productId));
      saveCart(updated);
      toastMessage({
        title: '장바구니 상품 삭제',
        content: '상품이 장바구니에서 삭제되었습니다.',
        type: 'success',
      });
    }
  };

  const updateCartStock = (productId: number, stock: number) => {
    if (user) {
      updateCartItemStock({
        userId: user.id,
        productId,
        stock,
      });
    } else {
      const cart = getCart();
      const updated = cart.map((item) => (item.productId === productId ? { ...item, stock } : item));
      saveCart(updated);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(EXPIRE_KEY);
  };

  return {
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    updateCartStock,
    clearCart,
  };
};
