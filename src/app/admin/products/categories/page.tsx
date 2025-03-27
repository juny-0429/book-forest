'use client';

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import Button from 'src/components/Button/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import { categoriesColumns } from './_data/categories.columns';
import { useCustomModal } from 'src/hooks/useModal';
import AddCategoryModalContent from './_components/AddCategoryModalContent';

const mockData = [
  {
    categoryId: 1,
    categoryName: '소설',
    categoryCode: 'novel',
    parentName: '-',
  },
  {
    categoryId: 2,
    categoryName: '소설',
    categoryCode: 'novel',
    parentName: '-',
  },
];

export default function CategoriesPage() {
  const { openCustomModal } = useCustomModal();

  const table = useReactTable({
    data: mockData,
    columns: categoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const openAddCategoryModal = () => {
    openCustomModal({
      children: <AddCategoryModalContent />,
    });
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <h2 className='text-title-32b mb-6'>카테고리 관리</h2>
        <Button height={48} onClick={openAddCategoryModal} className='w-fit'>
          카테고리 등록
        </Button>
      </div>

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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={mockData.length} className='text-center'>
                게시글이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
