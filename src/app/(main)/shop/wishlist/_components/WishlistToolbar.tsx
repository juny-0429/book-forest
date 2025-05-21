import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import LucideIcons from 'src/theme/lucideIcon';
import { WishlistItemDto } from '../_dtos/GetWhislistItem.dto';
import { cn } from 'src/lib/utils';

interface WishlistToolbarProps {
  wishlist: WishlistItemDto[];
  isAllSelected: boolean;
  view: 'grid' | 'list';
  toggleSelectAll: () => void;
  onDeleteSelected: () => void;
  onUpdateViewType: (type: 'grid' | 'list') => void;
  onAddToCart: () => void;
}

export default function WishlistToolbar({ wishlist, isAllSelected, view, toggleSelectAll, onDeleteSelected, onUpdateViewType, onAddToCart }: WishlistToolbarProps) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex justify-between items-center'>
        <CheckBox checked={isAllSelected} onChange={toggleSelectAll}>
          모두 선택
        </CheckBox>

        <div className='flex justify-center items-center gap-1 w-fit'>
          <LineButton height={40} color='gray' onClick={onAddToCart}>
            <LucideIcons.ShoppingCart size={20} className='text-gray-900' />
            카트담기
          </LineButton>
          <LineButton height={40} color='gray' onClick={onDeleteSelected}>
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
    </div>
  );
}
