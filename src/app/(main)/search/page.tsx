'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useGetSearchProductList } from './_hooks/react-query/useGetSearchProductList';
import Link from 'next/link';
import LucideIcons from 'src/theme/lucideIcon';
import LineButton from 'src/components/Button/LineButton';
import Button from 'src/components/Button/Button';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import dayjs from 'dayjs';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetSearchProductList(keyword);

  const productList = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <h2 className='text-title-32b text-ui-text-title'>
        &apos;{keyword}&apos; 에 대한 검색결과 : {totalCount}개
      </h2>

      <ul className='flex flex-col'>
        {productList.map((product) => (
          <li key={product.productId}>
            <article className='relative flex justify-between gap-10 h-[260px] pl-[30px] py-[30px]'>
              <div className='absolute top-[30px] left-0'>
                <CheckBox />
              </div>

              <div className='flex items-center gap-[30px] h-full'>
                {product.mainImageUrl && (
                  <Link href={`${appRoutes.productDetail}/${product.productId}`} className='min-w-[150px]'>
                    <Image src={product.mainImageUrl} width={150} height={100} priority alt='book image' className='book-item' />
                  </Link>
                )}

                <div className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-3'>
                      <Link href={`${appRoutes.productDetail}/${product.productId}`} className='hover:underline'>
                        <h3 className='text-title-24r text-ui-text-title'>{product.productName}</h3>
                      </Link>
                      <button>
                        <LucideIcons.Heart size={26} className='text-gray-500' />
                      </button>
                    </div>

                    <address className='flex items-center gap-2'>
                      <cite className='text-body-16m text-ui-text-description'>{product.authorName}</cite>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-16m text-ui-text-description'>{product.publisher}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <time className='text-body-16m text-ui-text-description'>{dayjs().format('YYYY년 MM월 DD일')} 출판</time>
                    </address>

                    <div className='flex items-center gap-2'>
                      <span className='text-body-16b text-ui-cta'>{product.discount}%</span>
                      <span className='text-body-18b text-ui-text-title'>{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}원</span>
                      <span className='text-body-16l text-ui-text-description line-through'>{product.price.toLocaleString()}원</span>
                    </div>
                  </div>

                  {product.productSummary && (
                    <div className='flex w-full h-[80px] px-[20px] py-[8px] border border-solid border-gray-300 rounded-[5px]'>
                      <p className='text-body-14l text-ui-text-title line-clamp-2'>{product.productSummary}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col items-center gap-2 w-fit'>
                <LineButton height={40}>찜하기</LineButton>
                <LineButton height={40}>카트 담기</LineButton>
                <Button height={40}>바로 구매</Button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {hasNextPage && <div ref={observerRef} className='h-10' />}
      {isFetchingNextPage && <p className='text-center py-4'>불러오는 중...</p>}
    </div>
  );
}
