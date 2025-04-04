'use client';

import { useProductColumns } from './_data/productColumns.data';
import { useGetProductList } from './_hooks/react-query/useGetProductList';
import { useSearchParams } from 'next/navigation';
import { useProductSelection } from './_hooks/useProductSelection';
import { useUpdateProductBatchStatus } from './_hooks/react-query/useUpdateProductBaatchStatus';
import ProductToolbar from './_components/ProductToolbar';
import ProductTable from './_components/ProductTable';
import ProductPagination from './_components/ProdictPagination';

export default function ProductManagementPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');

  const { data } = useGetProductList(page);
  const productList = data?.productList ?? [];

  const { selectedIds, isAllSelected, onCheckItem, onCheckItemAll, onClearSelectedIds } = useProductSelection(productList);

  const columns = useProductColumns({
    productList,
    page,
    selectedIds,
    isAllSelected,
    onCheckItem,
    onCheckItemAll,
  });

  const { mutate: updateProductBatchStatus } = useUpdateProductBatchStatus();

  const onStatusChange = (isActive: boolean) => {
    updateProductBatchStatus(
      { productIds: selectedIds, isActive, page },
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
        onClickDelete={() => {}} // 나중에 연결
      />

      <div className='flex flex-col gap-5 w-full'>
        <ProductTable productList={productList} columns={columns} />
        <ProductPagination currentPage={page} totalItems={data?.total ?? 0} />
      </div>
    </div>
  );
}
