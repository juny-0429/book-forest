'use client';

import CategoryBanner from 'src/components/Banner/CategoryBanner';
import CategoryGridList from './_components/CategoryGridList';
import CategoryRowList from './_components/CategoryRowList';
import { useGetCategoryProductList } from './_hooks/react-query/useGetCategoryProductList';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import CategoryBreadcrumb from './_components/CategoryBreadcrumb';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetCategoryPath } from './_hooks/react-query/useGetCategoryPath';
import CategoryToolbar from './_components/CategoryToolbar';
import { toastMessage } from 'src/hooks/useToast';
import { useCart } from '../../cart/_hooks/useCart';
import { useAuth } from 'src/provider/authProvider';
import { useCreateWishlist } from '../../shop/wishlist/_hooks/react-query/useCreateWishlistItem';
import { useConfirmModal } from 'src/hooks/useModal';
import { appRoutes } from 'src/routes/appRoutes';

export default function CategoryPage() {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { categoryCode } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { ref, inView } = useInView();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { mutate: createWishlist } = useCreateWishlist(user?.id as string);
  const { openConfirmModal } = useConfirmModal();

  const view = searchParams.get('view') === 'list' ? 'list' : 'grid';

  const { data: categoryPath } = useGetCategoryPath(categoryCode as string);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCategoryProductList(categoryCode as string);

  const categoryProductList = data?.pages.flatMap((page) => page.categoryProductList) ?? [];

  const onUpdateViewType = (type: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams);
    params.set('view', type);
    router.push(`?${params.toString()}`);
  };

  const onToggleProduct = (id: number) => {
    setSelectedProductIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const onAddWishlist = (productId?: number) => {
    if (!user) {
      openConfirmModal({
        content: '로그인이 필요한 서비스입니다.',
        confirmButtonText: '로그인하기',
        onConfirm: () => {
          router.push(appRoutes.login);
        },
        onCancel: () => {},
      });
      return;
    }

    const productIds = productId ? [productId] : selectedProductIds;

    if (productIds.length === 0) return;

    createWishlist(productIds, {
      onSuccess: () => {
        toastMessage({
          title: '찜하기 완료',
          content: '선택한 상품이 찜 목록에 추가되었습니다.',
          type: 'success',
        });
        setSelectedProductIds([]);
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

  useEffect(() => {
    const view = searchParams.get('view');
    if (!view) {
      const newUrl = `${pathname}?view=grid`;
      router.replace(newUrl);
    }
  }, [searchParams, pathname, router]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className='flex flex-col gap-10 w-full'>
      {categoryPath && (
        <div className='space-y-2'>
          <h2 className='text-title-32b text-ui-text-title'>{categoryPath[categoryPath.length - 1]?.name ?? ''}</h2>
          <CategoryBreadcrumb categoryPath={categoryPath} />
        </div>
      )}

      <CategoryBanner />

      <div className='flex flex-col gap-4'>
        <CategoryToolbar view={view} onUpdateViewType={onUpdateViewType} onAddToCart={onAddToCart} onAddWishlist={() => onAddWishlist()} />
        <hr className='w-full h-[1px] bg-gray-300' />
        {view === 'grid' && <CategoryGridList categoryProductList={categoryProductList} selectedProductIds={selectedProductIds} onToggleProduct={onToggleProduct} />}
        {view === 'list' && <CategoryRowList categoryProductList={categoryProductList} selectedProductIds={selectedProductIds} onToggleProduct={onToggleProduct} onAddWishlist={onAddWishlist} />}
      </div>

      {categoryProductList.length !== 0 && !isFetchingNextPage && <div ref={ref} className='h-[1px]' />}
    </div>
  );
}
