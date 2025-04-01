'use client';

import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import SearchBar from 'src/components/SearchBar/SearchBar';
import { cn } from 'src/lib/utils';
import { useSearchAuthor } from '../_hooks/react-query/useSearchAuthor';
import { useCustomModal } from 'src/hooks/useModal';

interface Author {
  id: number;
  name: string;
}

interface SearchAuthorModalContentProps {
  onSelect: (author: Author) => void;
}

export default function SearchAuthorModalContent({ onSelect }: SearchAuthorModalContentProps) {
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const { data = [] } = useSearchAuthor(searchKeyword);

  const { closeCustomModal } = useCustomModal();

  const onAuthorSelect = (author: Author) => {
    setSelectedAuthor(author);
    onSelect(author);
    closeCustomModal();
  };

  return (
    <div className='flex flex-col gap-2'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex items-center gap-1'>
          <SearchBar placeholder='작가를 검색하세요' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          <Button height={48} className='w-fit' type='submit'>
            검색
          </Button>
        </div>
      </form>

      <ul className='flex flex-col gap-1 h-[250px] p-3 border border-solid border-gray-600 rounded-[8px] overflow-y-auto'>
        {data.length !== 0 &&
          data.map((author) => (
            <li key={author.id}>
              <button
                type='button'
                onClick={() => onAuthorSelect(author)}
                className={cn('w-full text-left px-3 py-2 rounded-md hover:bg-gray-200', selectedAuthor?.id === author.id && 'bg-gray-300 font-semibold')}
              >
                {author.name}
              </button>
            </li>
          ))}
        {data.length === 0 && <li>검색 결과가 없습니다.</li>}
      </ul>
    </div>
  );
}
