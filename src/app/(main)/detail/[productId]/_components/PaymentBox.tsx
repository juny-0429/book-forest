'use client';

import React, { useState } from 'react';
import { useCart } from 'src/app/(main)/cart/_hooks/useCart';
import { useCreateWishlist } from 'src/app/(main)/shop/wishlist/_hooks/react-query/useCreateWishlistItem';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import { useAlertModal } from 'src/hooks/useModal';
import { toastMessage } from 'src/hooks/useToast';
import { useAuth } from 'src/provider/authProvider';
import LucideIcons from 'src/theme/lucideIcon';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';

interface Props {
  productId: number;
  price: number;
  discount: number;
}

export default function PaymentBox({ productId, price, discount }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { openAlertModal } = useAlertModal();
  const { mutate: createWishlist } = useCreateWishlist(user?.id ?? '');

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const onAddToWishlist = () => {
    if (!user) {
      openAlertModal({
        content: '로그인이 필요한 서비스 입니다.',
      });
      return;
    }

    createWishlist([productId], {
      onSuccess: () => {
        toastMessage({
          title: '찜하기 완료',
          content: '상품이 찜 목록에 추가되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        toastMessage({
          title: '찜하기 실패',
          content: '찜 목록 추가에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        });
      },
    });
  };

  const discountedPrice = calculateDiscountedPrice(price, discount);
  const totalPrice = discountedPrice * quantity;

  return (
    <div className='fixed bottom-0 left-0 flex justify-center items-center w-full h-20 bg-gray-50 border-t border-solid border-gray-600 shadow-blur-4-25'>
      <div className='flex justify-between items-center w-[1200px]'>
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
            <span className='w-[20px] text-center text-body-18b'>{quantity}</span>
            <button onClick={increaseQuantity}>
              <LucideIcons.Plus size={24} strokeWidth={3} className='text-gray-700' />
            </button>
          </div>

          <div className='flex items-center gap-1 w-fit'>
            <LineButton height={48} onClick={onAddToWishlist}>
              찜하기
            </LineButton>
            <LineButton
              height={48}
              onClick={() => {
                addToCart([{ productId: productId, stock: quantity }]);
              }}
            >
              장바구니
            </LineButton>
            <Button height={48}>바로구매</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
