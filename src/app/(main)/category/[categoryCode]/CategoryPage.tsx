'use client';

import CategoryBanner from 'src/components/Banner/CategoryBanner';
import CategoryGridList from './_components/CategoryGridList';
import CategoryRowList from './_components/CategoryRowList';
import { useGetCategoryProductList } from './_hooks/react-query/useGetCategoryProductList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CategoryBreadcrumb from './_components/CategoryBreadcrumb';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetCategoryPath } from './_hooks/react-query/useGetCategoryPath';
import CategoryToolbar from './_components/CategoryToolbar';

export default function CategoryPage({ categoryCode }: { categoryCode: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { ref, inView } = useInView();

  const view = searchParams.get('view') === 'list' ? 'list' : 'grid';

  const { data: categoryPath } = useGetCategoryPath(categoryCode as string);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCategoryProductList(categoryCode as string);

  const categoryProductList = data?.pages.flatMap((page) => page.categoryProductList) ?? [];

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

      <div className='flex flex-col gap-4'>
        <CategoryToolbar view={view} onUpdateViewType={onUpdateViewType} />
        <hr className='w-full h-[1px] bg-gray-300' />
        {view === 'grid' && <CategoryGridList categoryProductList={categoryProductList} />}
        {view === 'list' && <CategoryRowList categoryProductList={categoryProductList} />}
      </div>

      {categoryProductList.length !== 0 && !isFetchingNextPage && <div ref={ref} className='h-[1px]' />}
    </div>
  );
}
