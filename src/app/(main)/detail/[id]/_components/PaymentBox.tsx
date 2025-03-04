'use client';

import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';

interface Props {
  price: number;
  discount: number;
}

export default function PaymentBox({ price, discount }: Props) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const discountedPrice = calculateDiscountedPrice(price, discount);
  const totalPrice = discountedPrice * quantity;

  return (
    <div className='fixed bottom-0 left-0 flex justify-between items-center w-full h-20 px-[150px] bg-gray-50 border-t border-solid border-gray-600 shadow-blur-4-25'>
      <div className='flex items-center gap-3'>
        <span className='text-body-16r text-ui-text-title'>총 상품 금액</span>
        <span className='text-title-24b text-ui-text-title'>{totalPrice.toLocaleString()}원</span>
        <span className='text-body-16l text-ui-text-description line-through'>{(price * quantity).toLocaleString()}원</span>
      </div>

      <div className='flex gap-10'>
        <div className='flex justify-center items-center gap-4 px-[8px] py-[6px] bg-white border border-solid border-gray-600 rounded-[5px]'>
          <button onClick={decreaseQuantity}>
            <LucideIcons.Minus size={24} strokeWidth={3} className='text-gray-700' />
          </button>
          <span className='w-[20px] text-body-18b'>{quantity}</span>
          <button onClick={increaseQuantity}>
            <LucideIcons.Plus size={24} strokeWidth={3} className='text-gray-700' />
          </button>
        </div>

        <div className='flex items-center gap-1 w-fit'>
          <LineButton height={48}>찜하기</LineButton>
          <LineButton height={48}>장바구니</LineButton>
          <Button height={48}>바로구매</Button>
        </div>
      </div>
    </div>
  );
}
