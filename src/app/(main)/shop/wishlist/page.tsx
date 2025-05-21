'use client';

import WishlistGridList from './_components/WishlistGridList';
import WishlistRowList from './_components/WishlistRowList';
import { useAuth } from 'src/provider/authProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWishlistByUserId } from './_hooks/react-query/useGetWhishlistByUserId';
import { useDeleteWishlist } from './_hooks/react-query/useDeleteWishlistItem';
import { useState } from 'react';
import { toastMessage } from 'src/hooks/useToast';
import WishlistToolbar from './_components/WishlistToolbar';
import { useCart } from '../../cart/_hooks/useCart';

export default function wishlist() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view') === 'list' ? 'list' : 'grid';
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { data } = useWishlistByUserId(userId);
  const wishlist = data ?? [];
  const { mutate: deleteWishlist } = useDeleteWishlist(userId);
  const { addToCart } = useCart();

  const onUpdateViewType = (type: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams);
    params.set('view', type);
    router.push(`?${params.toString()}`);
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.length === wishlist.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(wishlist.map((item) => item.productId));
    }
  };

  const isAllSelected = wishlist.length > 0 && selectedProductIds.length === wishlist.length;

  const onToggleSelect = (productId: number) => {
    setSelectedProductIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const onDeleteSelected = () => {
    if (selectedProductIds.length === 0) return;

    deleteWishlist(selectedProductIds, {
      onSuccess: () => {
        toastMessage({
          title: '찜 삭제 완료',
          content: '선택한 상품이 삭제되었습니다.',
          type: 'success',
        });
        setSelectedProductIds([]);
        router.refresh();
      },
    });
  };

  const onAddToCart = () => {
    if (selectedProductIds.length === 0) return;

    const cartItems = selectedProductIds.map((id) => ({
      productId: id,
      stock: 1,
    }));

    addToCart(cartItems);
    setSelectedProductIds([]);
  };

  return (
    <div className='flex flex-col gap-10 w-full'>
      <h2 className='text-title-24b text-ui-text-title'>찜하기 목록</h2>

      <div className='flex flex-col gap-3'>
        <WishlistToolbar
          wishlist={wishlist}
          isAllSelected={isAllSelected}
          toggleSelectAll={toggleSelectAll}
          onDeleteSelected={onDeleteSelected}
          view={view}
          onUpdateViewType={onUpdateViewType}
          onAddToCart={onAddToCart}
        />
        {view === 'grid' && wishlist && <WishlistGridList wishlist={wishlist} selectedProductIds={selectedProductIds} onToggleSelect={onToggleSelect} />}
        {view === 'list' && wishlist && <WishlistRowList wishlist={wishlist} selectedProductIds={selectedProductIds} deleteWishlist={deleteWishlist} onToggleSelect={onToggleSelect} />}
      </div>
    </div>
  );
}
