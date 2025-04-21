export function getShippingFee(discountedTotal: number, cartList: { delivery_price: number }[]): number {
  if (discountedTotal >= 50000) return 0;

  const hasShippingItem = cartList.some((item) => item.delivery_price === 3000);
  return hasShippingItem ? 3000 : 0;
}
