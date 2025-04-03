'use client';

import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import { productColumns } from './_data/productColumns.data';
import { GetProductListDto } from './_dtos/getProductList.dto';

const eventPostList: GetProductListDto[] = [
  {
    productId: 1,
    productName: 123456,
    authorName: '김초엽',
    publisher: '문학동네',
    isbn: 9788954671234,
    price: 15000,
    stock: 20,
    isActive: true,
    discount: 10,
    deliveryPrice: 2500,
    publishedDate: 20220101,
  },
  {
    productId: 2,
    productName: 234567,
    authorName: '박상영',
    publisher: '민음사',
    isbn: 9788937401234,
    price: 13800,
    stock: 5,
    isActive: false,
    discount: 5,
    deliveryPrice: 3000,
    publishedDate: 20220315,
  },
  {
    productId: 3,
    productName: 345678,
    authorName: '한강',
    publisher: '창비',
    isbn: 9788936471234,
    price: 17000,
    stock: 12,
    isActive: true,
    discount: 15,
    deliveryPrice: 0,
    publishedDate: 20211210,
  },
];

export default function ProductManagementPage() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: eventPostList ?? [],
    columns: productColumns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div>
      <h2 className='text-title-24b text-ui-text-title mb-[50px]'>상품 목록</h2>

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
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={cell.column.id === 'postTitle' ? 'text-left' : 'text-center'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={productColumns.length} className='text-center'>
                등록된 상품이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
