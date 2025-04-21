export function getShippingFee(discountedTotal: number, cartList: { deliveryPrice: number }[]): number {
  if (discountedTotal >= 50000) return 0;

  const hasShippingItem = cartList.some((item) => item.deliveryPrice === 3000);
  return hasShippingItem ? 3000 : 0;
}
