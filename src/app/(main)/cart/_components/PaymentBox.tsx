import React from 'react';
import Button from 'src/components/Button/Button';
import { useCartSummary } from '../_hooks/useCartSummary';
import { CartListItemDto } from '../_dtos/getCartList.dto';

interface PaymentBoxProps {
  cartList: CartListItemDto[];
}

export default function PaymentBox({ cartList }: PaymentBoxProps) {
  const { totalProductPrice, totalDiscount, shippingFee, finalPrice } = useCartSummary(cartList);

  return (
    <aside className='flex flex-col items-center gap-5 w-[400px]'>
      <div className='flex flex-col items-center gap-3 w-full p-5 border border-solid border-gray-900 rounded-[6px]'>
        <div className='flex justify-between items-center w-full'>
          <span className='text-body-18l text-ui-text-description'>총 상품 금액</span>
          <span className='text-body-18m text-ui-text-title'>{totalProductPrice.toLocaleString()}원</span>
        </div>
        <div className='flex justify-between items-center w-full'>
          <span className='text-body-18l text-ui-text-description'>배송비</span>
          <span className='text-body-18m text-ui-text-title'>{shippingFee.toLocaleString()}원</span>
        </div>
        <div className='flex justify-between items-center w-full'>
          <span className='text-body-18l text-ui-text-description'>상품 할인</span>
          <span className='text-body-18m text-ui-text-title'>-{totalDiscount.toLocaleString()}원</span>
        </div>

        <hr className='w-full h-[1px] bg-gray-600' />

        <div className='flex justify-between items-center w-full'>
          <strong className='text-body-18m text-ui-text-title'>결제 금액</strong>
          <strong className='text-title-24b text-ui-text-title'>{finalPrice.toLocaleString()}원</strong>
        </div>
      </div>

      <Button height={48}>{cartList.length}개 상품 주문하기</Button>
    </aside>
  );
}
