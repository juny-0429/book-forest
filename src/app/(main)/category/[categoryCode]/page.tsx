'use client';

import CategoryBanner from 'src/components/Banner/CategoryBanner';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';
import Select from 'src/components/Select/Select';
import { cn } from 'src/lib/utils';
import CategoryGridList from './_components/CategoryGridList';
import CategoryRowList from './_components/CategoryRowList';
import { useGetCategoryProductList } from './_hooks/react-query/useGetCategoryProductList';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import CategoryBreadcrumb from './_components/CategoryBreadcrumb';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetCategoryPath } from './_hooks/react-query/useGetCategoryPath';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { ref, inView } = useInView();

  const view = searchParams.get('view') === 'list' ? 'list' : 'grid';
  const categoryCode = params.categoryCode;

  const { data: categoryPath } = useGetCategoryPath(categoryCode as string);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCategoryProductList(categoryCode as string);

  const categoryProductList = data?.pages.flatMap((page) => page.categoryProductList) ?? [];

  const options: SelectOption[] = [
    { value: '', label: '제목순' },
    { value: '', label: '작가순' },
    { value: '', label: '가격' },
  ];

  const onUpdateViewType = (type: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams);
    params.set('view', type);
    router.push(`?${params.toString()}`);
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

      <div className='flex flex-col items-end gap-4 w-full'>
        <div className='flex justify-center items-center gap-1 w-fit'>
          <LineButton height={40} color='gray' leftIcon={<LucideIcons.Heart size={20} />}>
            찜하기
          </LineButton>
          <LineButton height={40} color='gray' leftIcon={<LucideIcons.ShoppingCart size={20} />}>
            카트담기
          </LineButton>
          <LineButton height={40}>필터</LineButton>
        </div>

        <hr className='w-full h-[1px] bg-gray-300' />

        <div className='flex justify-center items-center gap-3'>
          <Select options={options} placeholder='정렬 기준 선택' />

          <button onClick={() => onUpdateViewType('grid')}>
            <LucideIcons.Grid2X2 size={30} className={cn(view === 'grid' ? 'text-gray-900' : 'text-gray-600')} />
          </button>
          <button onClick={() => onUpdateViewType('list')}>
            <LucideIcons.Menu size={30} className={cn(view === 'list' ? 'text-gray-900' : 'text-gray-600')} />
          </button>
        </div>
      </div>

      {view === 'grid' && <CategoryGridList categoryProductList={categoryProductList} />}
      {view === 'list' && <CategoryRowList categoryProductList={categoryProductList} />}

      {categoryProductList.length !== 0 && !isFetchingNextPage && <div ref={ref} className='h-[1px]' />}
    </div>
  );
}
