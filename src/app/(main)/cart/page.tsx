'use client';

import { useGetCartList } from './_hooks/react-query/useGetCartList';
import { CartItemType, useCart } from './_hooks/useCart';
import { useEffect, useState } from 'react';
import CartItem from './_components/CartItem';
import { CartListItemDto } from './_dtos/getCartList.dto';
import PaymentBox from './_components/PaymentBox';
import CartNoticeButton from './_components/CartNoticeButton';
import { useAuth } from 'src/provider/authProvider';
import { useGetCartListByUserId } from './_hooks/react-query/useGetCartListByUserId';
import { toastMessage } from 'src/hooks/useToast';
import CartToolbar from './_components/CartToolbar';
import { useCreateWishlist } from '../shop/wishlist/_hooks/react-query/useCreateWishlistItem';
import { useAlertModal } from 'src/hooks/useModal';

export default function CartPage() {
  const { getCart, addToCart, removeFromCart, updateCartStock, clearCart } = useCart();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [cartList, setCartList] = useState<CartListItemDto[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { user } = useAuth();
  const { mutate: createWishlist } = useCreateWishlist(user?.id ?? '');
  const { openAlertModal } = useAlertModal();

  const { data } = user ? useGetCartListByUserId(user.id) : useGetCartList(cart.map((item) => ({ productId: item.productId, stock: item.stock })));

  const toggleProductSelection = (productId: number) => {
    setSelectedProductIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const toggleSelectAll = () => {
    const allIds = cartList.map((item) => item.productId);
    const isAllSelected = allIds.every((id) => selectedProductIds.includes(id));
    setSelectedProductIds(isAllSelected ? [] : allIds);
  };

  const onAddWishlist = () => {
    if (!user) {
      openAlertModal({
        content: '로그인이 필요한 서비스 입니다.',
      });
      return;
    }

    createWishlist(selectedProductIds, {
      onSuccess: () => {
        toastMessage({
          title: '찜하기 완료',
          content: '선택한 상품이 찜 목록에 추가되었습니다.',
          type: 'success',
        });
      },
    });
  };

  useEffect(() => {
    if (user) {
      const guestCart = getCart();
      if (guestCart.length > 0) {
        addToCart(guestCart);
        clearCart();
        setCart([]);
      }
    } else {
      setCart(getCart());
    }
  }, [user]);

  useEffect(() => {
    if (data) setCartList(data);
  }, [data]);

  return (
    <div className='flex flex-grow flex-col gap-[30px]'>
      <h2 className='text-title-32b text-ui-text-title'>장바구니({cartList.length})</h2>

      <div className='flex justify-center gap-10'>
        <div className='flex flex-col items-end gap-5 w-full'>
          <CartToolbar
            cartList={cartList}
            selectedProductIds={selectedProductIds}
            toggleSelectAll={toggleSelectAll}
            onSelectedRemove={() => {
              if (selectedProductIds.length === 0) return;
              removeFromCart(selectedProductIds);
              setSelectedProductIds([]);
            }}
            onAddWishlist={onAddWishlist}
          />

          <ul className='w-full border-t border-solid border-gray-300'>
            {cartList &&
              cartList.map((item) => {
                return (
                  <CartItem
                    key={item.productId}
                    item={item}
                    stock={item.stock}
                    checked={selectedProductIds.includes(item.productId)}
                    onToggle={() => toggleProductSelection(item.productId)}
                    onCartItemRemove={() => removeFromCart(item.productId)}
                    updateCartStock={updateCartStock}
                  />
                );
              })}
          </ul>
          <CartNoticeButton />
        </div>

        <PaymentBox cartList={cartList} />
      </div>
    </div>
  );
}
