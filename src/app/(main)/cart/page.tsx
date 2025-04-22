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
import { useCreateCartListByUserId } from './_hooks/react-query/useCreateCartListByUserId';
import { useUpdateCartItemStock } from './_hooks/react-query/useUpdateCartItemStock';
import { useDeleteCartItemByUserId } from './_hooks/react-query/useDeleteCartItemListByUserId';
import { toastMessage } from 'src/hooks/useToast';
import CartToolbar from './_components/CartToolbar';

export default function CartPage() {
  const { getCart, removeFromCart, saveCart, clearCart } = useCart();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [cartList, setCartList] = useState<CartListItemDto[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { user } = useAuth();
  const { mutate: createCartListByUserId } = useCreateCartListByUserId();
  const { mutate: updateCartItemStock } = useUpdateCartItemStock();
  const { mutate: deleteCartItemsByUserId } = useDeleteCartItemByUserId();

  const { data } = user ? useGetCartListByUserId(user.id) : useGetCartList(cart.map((item) => ({ productId: item.productId, stock: item.stock })));

  // 장바구니 항목 수량 변경 시 호출
  const onStockChange = (productId: number, stock: number) => {
    if (user) {
      updateCartItemStock({ userId: user.id, productId, stock });
    } else {
      setCart((prev) => {
        const updated = prev.map((item) => (item.productId === productId ? { ...item, stock } : item));
        saveCart(updated);
        return updated;
      });
    }
  };

  // 장바구니에서 특정 상품을 제거
  const onCartItemRemove = (productId: number) => {
    if (user) {
      deleteCartItemsByUserId(
        {
          userId: user.id,
          productIds: [productId],
        },
        {
          onSuccess: () => {
            toastMessage({
              title: '장바구니 상품 삭제',
              content: '상품이 장바구니에서 삭제되었습니다.',
              type: 'success',
            });
          },
        }
      );
    } else {
      const updatedCart = cart.filter((item) => item.productId !== productId);
      const updatedCartList = cartList.filter((item) => item.productId !== productId);
      setCart(updatedCart);
      setCartList(updatedCartList);
      saveCart(updatedCart);
      removeFromCart(productId);
    }
  };

  // 개별 상품 선택/선택 해제
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
    if (user) {
      deleteCartItemsByUserId(
        {
          userId: user.id,
          productIds: selectedProductIds,
        },
        {
          onSuccess: () => {
            toastMessage({
              title: '장바구니 상품 삭제',
              content: '상품이 장바구니에서 삭제되었습니다.',
              type: 'success',
            });
          },
        }
      );
    } else {
      const updatedCart = cart.filter((item) => !selectedProductIds.includes(item.productId));
      const updatedCartList = cartList.filter((item) => !selectedProductIds.includes(item.productId));
      setCart(updatedCart);
      setCartList(updatedCartList);
      saveCart(updatedCart);
      setSelectedProductIds([]);
      toastMessage({
        title: '장바구니 상품 삭제',
        content: '상품이 장바구니에서 삭제되었습니다.',
        type: 'success',
      });
    }
  };

  useEffect(() => {
    if (user) {
      const guestCart = getCart();
      if (guestCart.length > 0) {
        createCartListByUserId(
          {
            userId: user.id,
            cart: guestCart,
          },
          {
            onSuccess: () => {
              clearCart();
              setCart([]);
            },
          }
        );
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
          <CartToolbar cartList={cartList} selectedProductIds={selectedProductIds} toggleSelectAll={toggleSelectAll} onSelectedRemove={onSelectedRemove} />

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
                    onCartItemRemove={onCartItemRemove}
                    onStockChange={onStockChange}
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
