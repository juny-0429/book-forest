'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { SearchProductListItemDto } from 'src/app/(main)/_dtos/getSearchProductList.dto';
import { useGetSearchBarProductList } from 'src/app/(main)/_hooks/react-query/useGetSearchProductList';
import SearchBar from 'src/components/SearchBar/SearchBar';
import { appRoutes } from 'src/routes/appRoutes';
import LucideIcons from 'src/theme/lucideIcon';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';

export default function HeaderSearchBar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const router = useRouter();

  const onSearch = () => {
    if (!keyword.trim()) return;
    setIsResultOpen(false);
    setKeyword('');
    setCurrentPage(1);
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  useEffect(() => {
    if (keyword) {
      setCurrentPage(1);
      setIsResultOpen(true);
    }
  }, [keyword]);

  useEffect(() => {
    if (!isResultOpen) {
      setCurrentPage(1);
    }
  }, [isResultOpen]);

  const limit = 4;
  const { data } = useGetSearchBarProductList(keyword, currentPage, limit);

  const productList = data?.productList ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className='relative'>
      <SearchBar className='w-[400px]' placeholder='검색어를 입력하세요' value={keyword} onChange={(e) => setKeyword(e.target.value)} onSearch={onSearch} />

      {isResultOpen && keyword && productList.length > 0 && (
        <div className='absolute flex flex-col gap-4 mt-2 p-5 w-[800px] bg-white border border-solid border-gray-500 rounded-[20px] z-50'>
          <button className='absolute top-5 right-5' onClick={() => setIsResultOpen(false)}>
            <LucideIcons.X />
          </button>
          <h2 className='text-body-18b text-ui-text-title'>빠른 검색</h2>
          <div className='grid grid-cols-2 gap-3'>
            {productList.map((book: SearchProductListItemDto) => (
              <div key={book.productId} className='flex items-center gap-2'>
                {book.mainImageUrl && (
                  <Link href={`${appRoutes.productDetail}/${book.productId}`} onClick={() => setTimeout(() => setIsResultOpen(false), 0)}>
                    <Image src={book.mainImageUrl} width={70} height={70} alt='product image' className='book-item' />
                  </Link>
                )}

                <div className='flex flex-col gap-1'>
                  <Link href={`${appRoutes.productDetail}/${book.productId}`} onClick={() => setTimeout(() => setIsResultOpen(false), 0)}>
                    <p className='text-body-16b text-ui-text-title hover:underline'>{book.productName}</p>
                  </Link>
                  <p className='text-body-16r text-ui-text-description'>{`${book.authorName}(${book.publisher})`}</p>
                  <div className='flex gap-2'>
                    {typeof book.discount === 'number' && book.discount > 0 && <span className='text-body-16r text-ui-cta'>{book.discount}%</span>}
                    <span className='text-body-16b text-ui-text-title'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className='flex justify-center items-center w-full mt-2 gap-1'>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className='text-white p-1 rounded bg-black/50 hover:bg-black/80 disabled:opacity-50'>
              <LucideIcons.ChevronLeft size={20} />
            </button>

            <div className='px-2 py-1 text-body-14r text-white bg-black/50 rounded'>
              {String(currentPage).padStart(2, '0')} - {String(totalPages).padStart(2, '0')}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='text-white p-1 rounded bg-black/50 hover:bg-black/80 disabled:opacity-50'
            >
              <LucideIcons.ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
