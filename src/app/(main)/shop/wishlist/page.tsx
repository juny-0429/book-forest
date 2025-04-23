'use client';

import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import Select from 'src/components/Select/Select';
import LucideIcons from 'src/theme/lucideIcon';
import WishlistGridList from './_components/WishlistGridList';
import WishlistRowList from './_components/WishlistRowList';
import { cn } from 'src/lib/utils';
import { useAuth } from 'src/provider/authProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWishlistByUserId } from './_hooks/react-query/useGetWhishlistByUserId';

// todo: 인피니티 스크롤 적용하기
export default function wishlist() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view') === 'list' ? 'list' : 'grid';

  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { data: wishlist } = useWishlistByUserId(userId);

  const onUpdateViewType = (type: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams);
    params.set('view', type);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='flex flex-col gap-10 w-full'>
      <h2 className='text-title-24b text-ui-text-title'>찜하기 목록</h2>

      <div className='flex flex-col gap-3'>
        <div className='flex justify-between items-center'>
          <CheckBox>모두선택</CheckBox>

          <div className='flex justify-center items-center gap-1 w-fit'>
            <LineButton height={40} color='gray'>
              <LucideIcons.ShoppingCart size={20} className='text-gray-900' />
              카트담기
            </LineButton>
            <LineButton height={40} color='gray'>
              <LucideIcons.Trash2 size={20} className='text-gray-900' />
              삭제
            </LineButton>
          </div>
        </div>

        <hr className='w-full h-[1px] bg-gray-300' />

        <div className='flex justify-between items-center'>
          <p className='text-body-16r text-ui-text-title'>총 {wishlist?.length}개의 상품이 있습니다.</p>

          <div className='flex justify-center items-center gap-3'>
            <button
              onClick={() => {
                if (view !== 'grid') onUpdateViewType('grid');
              }}
            >
              <LucideIcons.Grid2X2 size={30} className={cn(view === 'grid' ? 'text-gray-900' : 'text-gray-600')} />
            </button>
            <button
              onClick={() => {
                if (view !== 'list') onUpdateViewType('list');
              }}
            >
              <LucideIcons.Menu size={30} className={cn(view === 'list' ? 'text-gray-900' : 'text-gray-600')} />
            </button>
          </div>
        </div>

        {view === 'grid' && wishlist && <WishlistGridList wishlist={wishlist} />}
        {view === 'list' && wishlist && <WishlistRowList wishlist={wishlist} />}
      </div>
    </div>
  );
}
