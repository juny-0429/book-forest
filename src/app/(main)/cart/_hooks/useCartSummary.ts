import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { getShippingFee } from 'src/utils/shipping';
import { CartListItemDto } from '../_dtos/getCartList.dto';
import { CartItemType } from './useCart';

export function useCartSummary(cart: CartItemType[], cartList: CartListItemDto[]) {
  const totalProductPrice = cart.reduce((acc, item) => {
    const info = cartList.find((c) => c.productId === item.productId);
    if (!info) return acc;
    return acc + info.price * item.count;
  }, 0);

  const totalDiscount = cart.reduce((acc, item) => {
    const info = cartList.find((c) => c.productId === item.productId);
    if (!info || info.discount === 0) return acc;
    const discounted = info.price - calculateDiscountedPrice(info.price, info.discount);
    return acc + discounted * item.count;
  }, 0);

  const discountedTotal = totalProductPrice - totalDiscount;
  const shippingFee = getShippingFee(discountedTotal, cartList);
  const finalPrice = discountedTotal + shippingFee;

  return {
    totalProductPrice,
    totalDiscount,
    shippingFee,
    finalPrice,
  };
}
