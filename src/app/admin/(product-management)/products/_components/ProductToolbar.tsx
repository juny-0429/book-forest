'use client';

import { useState } from 'react';
import Button from 'src/components/Button/Button';
import SearchBar from 'src/components/SearchBar/SearchBar';
import Select from 'src/components/Select/Select';
import { SelectOption } from 'src/types/select.types';

interface ProductToolbarProps {
  selectedCount: number;
  onClickActivate: () => void;
  onClickDeactivate: () => void;
  onSearch: (searchType: string, keyword: string) => void;
}

export default function ProductToolbar({ selectedCount, onClickActivate, onClickDeactivate, onSearch }: ProductToolbarProps) {
  const [searchType, setSearchType] = useState<string>('product_id');
  const [keyword, setKeyword] = useState<string>('');

  const options: SelectOption[] = [
    { value: 'productName', label: '상풍명' },
    { value: 'authorName', label: '작가명' },
    { value: 'publisher', label: '출판사' },
  ];

  return (
    <div className='flex justify-between items-center mb-2'>
      <div className='flex items-center gap-1'>
        <Select options={options} placeholder='검색어 선택' value={options.find((opt) => opt.value === searchType)} onChange={(option) => setSearchType(option?.value ?? 'product_id')} />
        <SearchBar
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch(searchType, keyword);
          }}
          onSearch={() => onSearch(searchType, keyword)}
        />
      </div>

      <div className='flex items-center gap-1'>
        <span className='text-body-16r text-ui-text-body'>선택된 상품: {selectedCount}개</span>

        <Button height={48} disabled={selectedCount === 0} onClick={onClickActivate} className='w-fit'>
          활성화
        </Button>

        <Button height={48} color='gray' disabled={selectedCount === 0} onClick={onClickDeactivate} className='w-fit'>
          비활성화
        </Button>
      </div>
    </div>
  );
}
