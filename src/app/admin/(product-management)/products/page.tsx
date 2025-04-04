'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from 'src/components/Pagination/pagination';
import { useProductColumns } from './_data/productColumns.data';
import { useGetProductList } from './_hooks/react-query/useGetProductList';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from 'src/components/Button/Button';
import { useProductSelection } from './_hooks/useProductSelection';
import { useUpdateProductBatchStatus } from './_hooks/react-query/useUpdateProductBaatchStatus';

export default function ProductManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  // 전체 페이지 수 계산 (한 페이지 10개 기준)
  const totalPages = Math.ceil((data?.total ?? 0) / 10);

  // 페이지네이션 범위 계산 (5개씩 묶음)
  const groupSize = 5;
  const startPage = Math.floor((page - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const pageRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 페이지 이동 함수 (쿼리스트링 수정)
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const table = useReactTable({
    data: productList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='flex-1 overflow-auto'>
      <h2 className='text-title-24b text-ui-text-title mb-[50px]'>상품 목록</h2>

      <div className='flex justify-between items-center mb-2'>
        <span className='text-body-16r text-ui-text-body'>선택된 상품: {selectedIds.length}개</span>

        <div className='flex items-center gap-1'>
          <Button height={40} disabled={selectedIds.length === 0} onClick={() => onStatusChange(true)} className='w-fit'>
            활성화
          </Button>

          <Button height={40} color='gray' disabled={selectedIds.length === 0} onClick={() => onStatusChange(false)} className='w-fit'>
            비활성화
          </Button>
          <Button height={40} color='red' disabled={selectedIds.length === 0} className='w-fit'>
            삭제
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-5 w-full'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className='cursor-pointer'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize(), minWidth: cell.column.getSize() }} className={cell.column.id === 'postTitle' ? 'text-left' : 'text-center'}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  등록된 상품이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 페이지네이션 */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(Math.max(page - 1, 1))} />
            </PaginationItem>

            {pageRange.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === page} onClick={() => goToPage(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => goToPage(Math.min(page + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
