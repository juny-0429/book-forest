'use client';

import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import LucideIcons from 'src/theme/lucideIcon';
import { useGetCartList } from './_hooks/react-query/useGetCartList';
import { CartItemType, useCart } from './_hooks/useCart';
import { useEffect, useState } from 'react';
import CartItem from './_components/CartItem';
import { CartListItemDto } from './_dtos/getCartList.dto';
import PaymentBox from './_components/PaymentBox';
import CartNoticeButton from './_components/CartNoticeButton';

export default function CartPage() {
  const { getCart, removeFromCart, saveCart } = useCart();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [cartList, setCartList] = useState<CartListItemDto[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const { data } = useGetCartList(cart.map((item) => item.productId));

  const onCountChange = (productId: number, count: number) => {
    setCart((prev) => {
      const updated = prev.map((item) => (item.productId === productId ? { ...item, count } : item));
      saveCart(updated);
      return updated;
    });
  };

  const onCartItemRemove = (productId: number) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    const updatedCartList = cartList.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    setCartList(updatedCartList);
    saveCart(updatedCart);
    removeFromCart(productId);
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProductIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  // 전체 선택
  const toggleSelectAll = () => {
    const allIds = cartList.map((item) => item.productId);
    const isAllSelected = allIds.every((id) => selectedProductIds.includes(id));
    setSelectedProductIds(isAllSelected ? [] : allIds);
  };

  // 선택 항목 삭제
  const onSelectedRemove = () => {
    const updatedCart = cart.filter((item) => !selectedProductIds.includes(item.productId));
    const updatedCartList = cartList.filter((item) => !selectedProductIds.includes(item.productId));
    setCart(updatedCart);
    setCartList(updatedCartList);
    saveCart(updatedCart);
    setSelectedProductIds([]);
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    if (data) setCartList(data);
  }, [data]);

  return (
    <div className='flex flex-grow flex-col gap-[30px]'>
      <h2 className='text-title-32b text-ui-text-title'>장바구니({cart.length})</h2>

      <div className='flex justify-center gap-10'>
        <div className='flex flex-col items-end gap-5 w-full'>
          {/* 모두 선택 */}
          <div className='flex justify-between w-full'>
            <CheckBox checked={selectedProductIds.length === cartList.length} onChange={toggleSelectAll}>
              모두 선택
            </CheckBox>

            <div className='flex justify-center items-center gap-1'>
              <LineButton height={40} color='gray' leftIcon={<LucideIcons.Heart size={20} />}>
                찜하기
              </LineButton>
              <LineButton height={40} color='gray' leftIcon={<LucideIcons.Trash2 size={20} />} onClick={onSelectedRemove}>
                삭제
              </LineButton>
            </div>
          </div>

          {/* 카트 상품 목록 */}
          <ul className='w-full border-t border-solid border-gray-300'>
            {cartList &&
              cartList.map((item) => {
                const count = cart.find((c) => c.productId === item.productId)?.count ?? 1;
                return (
                  <CartItem
                    key={item.productId}
                    item={item}
                    count={count}
                    checked={selectedProductIds.includes(item.productId)}
                    onToggle={() => toggleProductSelection(item.productId)}
                    onCartItemRemove={onCartItemRemove}
                    onCountChange={onCountChange}
                  />
                );
              })}
          </ul>
          <CartNoticeButton />
        </div>

        {/* 결제창 */}
        <PaymentBox cart={cart} cartList={cartList} />
      </div>
    </div>
  );
}
