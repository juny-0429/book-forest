export interface CartItem {
  productId: number;
  count: number;
}

export const useCart = () => {
  const CART_KEY = 'guest_cart';

  const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const addToCart = (item: CartItem) => {
    const cart = getCart();
    const updatedCart = [...cart];
    const exists = updatedCart.find((i) => i.productId === item.productId);

    if (exists) {
      exists.count += item.count;
    } else {
      updatedCart.push({ productId: item.productId, count: item.count });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updated = getCart().filter((item) => item.productId !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
