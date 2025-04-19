export interface CartItem {
  productId: number;
  count: number;
}

export const useCart = () => {
  const CART_KEY = 'guest_cart';
  const EXPIRE_KEY = 'guest_cart_expire';
  const EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24시간

  const isExpired = () => {
    const expire = localStorage.getItem(EXPIRE_KEY);
    return !expire || Date.now() > Number(expire);
  };

  const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    if (isExpired()) {
      clearCart();
      return [];
    }
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.setItem(EXPIRE_KEY, String(Date.now() + EXPIRE_TIME));
  };

  const addToCart = (item: CartItem) => {
    const cart = getCart();
    const exists = cart.find((i) => i.productId === item.productId);

    if (exists) {
      exists.count += item.count;
    } else {
      cart.push(item);
    }

    saveCart(cart);
  };

  const removeFromCart = (productId: number) => {
    const updated = getCart().filter((item) => item.productId !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(EXPIRE_KEY);
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
