'use client';

import Button from 'src/components/Button/Button';

interface ProductToolbarProps {
  selectedCount: number;
  onClickActivate: () => void;
  onClickDeactivate: () => void;
  onClickDelete: () => void;
}

export default function ProductToolbar({ selectedCount, onClickActivate, onClickDeactivate, onClickDelete }: ProductToolbarProps) {
  return (
    <div className='flex justify-between items-center mb-2'>
      <span className='text-body-16r text-ui-text-body'>선택된 상품: {selectedCount}개</span>

      <div className='flex items-center gap-1'>
        <Button height={40} disabled={selectedCount === 0} onClick={onClickActivate} className='w-fit'>
          활성화
        </Button>

        <Button height={40} color='gray' disabled={selectedCount === 0} onClick={onClickDeactivate} className='w-fit'>
          비활성화
        </Button>

        <Button height={40} color='red' disabled={selectedCount === 0} onClick={onClickDelete} className='w-fit'>
          삭제
        </Button>
      </div>
    </div>
  );
}
