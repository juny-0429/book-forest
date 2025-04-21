import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { getShippingFee } from 'src/utils/shipping';
import { CartListItemDto } from '../_dtos/getCartList.dto';

export function useCartSummary(cartList: CartListItemDto[]) {
  const totalProductPrice = cartList.reduce((acc, item) => acc + item.price * item.stock, 0);

  const totalDiscount = cartList.reduce((acc, item) => {
    if (item.discount === 0) return acc;
    const discounted = item.price - calculateDiscountedPrice(item.price, item.discount);
    return acc + discounted * item.stock;
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
