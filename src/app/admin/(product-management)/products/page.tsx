'use client';

import { useProductColumns } from './_data/productColumns.data';
import { useGetProductList } from './_hooks/react-query/useGetProductList';
import { useSearchParams } from 'next/navigation';
import { useProductSelection } from './_hooks/useProductSelection';
import { useUpdateProductBatchStatus } from './_hooks/react-query/useUpdateProductBaatchStatus';
import ProductToolbar from './_components/ProductToolbar';
import ProductTable from './_components/ProductTable';
import ProductPagination from './_components/ProdictPagination';
import { useRouter } from 'next/navigation';

export default function ProductManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const searchType = searchParams.get('searchType') ?? '';
  const keyword = searchParams.get('keyword') ?? '';

  const { data } = useGetProductList(page, searchType, keyword);
  const productList = data?.productList ?? [];

  const { selectedIds, isAllSelected, onCheckItem, onCheckItemAll, onClearSelectedIds } = useProductSelection(productList);

  const columns = useProductColumns({
    page,
    searchType,
    keyword,
    selectedIds,
    isAllSelected,
    onCheckItem,
    onCheckItemAll,
  });

  const { mutate: updateProductBatchStatus } = useUpdateProductBatchStatus();

  const onStatusChange = (isActive: boolean) => {
    updateProductBatchStatus(
      { productIds: selectedIds, isActive, page, searchType, keyword },
      {
        onSuccess: () => {
          onClearSelectedIds();
        },
      }
    );
  };

  return (
    <div className='flex-1 overflow-auto'>
      <h2 className='text-title-24b text-ui-text-title mb-[50px]'>상품 목록</h2>

      <ProductToolbar
        selectedCount={selectedIds.length}
        onClickActivate={() => onStatusChange(true)}
        onClickDeactivate={() => onStatusChange(false)}
        onSearch={(searchType, keyword) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('searchType', searchType);
          params.set('keyword', keyword);
          params.set('page', '1'); // 검색 시 첫 페이지로
          router.push(`?${params.toString()}`);
        }}
      />

      <div className='flex flex-col gap-5 w-full'>
        <ProductTable productList={productList} columns={columns} />
        <ProductPagination currentPage={page} totalItems={data?.total ?? 0} />
      </div>
    </div>
  );
}
