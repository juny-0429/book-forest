import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import LucideIcons from 'src/theme/lucideIcon';
import { CartListItemDto } from '../_dtos/getCartList.dto';

interface CartToolbarProps {
  cartList: CartListItemDto[];
  selectedProductIds: number[];
  toggleSelectAll: () => void;
  onSelectedRemove: () => void;
  onAddWishlist: () => void;
}

export default function CartToolbar({ cartList, selectedProductIds, toggleSelectAll, onSelectedRemove, onAddWishlist }: CartToolbarProps) {
  return (
    <div className='flex justify-between w-full'>
      <CheckBox checked={cartList.length > 0 && selectedProductIds.length === cartList.length} onChange={toggleSelectAll}>
        모두 선택
      </CheckBox>

      <div className='flex justify-center items-center gap-1'>
        <LineButton height={40} color='gray' leftIcon={<LucideIcons.Heart size={20} />} onClick={onAddWishlist}>
          찜하기
        </LineButton>
        <LineButton height={40} color='gray' leftIcon={<LucideIcons.Trash2 size={20} />} onClick={onSelectedRemove}>
          삭제
        </LineButton>
      </div>
    </div>
  );
}
