'use client';

import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import { appRoutes } from 'src/routes/appRoutes';
import Link from 'next/link';
import { BoardTableColumn } from 'src/types/boardTable.types';
import { boardColumns } from '../_data/boardColumns.data';

const mockData: BoardTableColumn[] = [
  { id: 1, title: '첫 번째 게시글', userId: 'user_001', createdAt: '2025-03-05' },
  { id: 2, title: 'React Table 적용', userId: 'user_002', createdAt: '2025-03-04' },
  { id: 3, title: '게시판 UI 퍼블리싱', userId: 'admin', createdAt: '2025-03-03' },
];

export default function QnaBoardPage() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: mockData,
    columns: boardColumns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div>
      <h2 className='text-title-24b text-ui-text-title mb-[50px]'>Q&A</h2>

      <div className='flex justify-between items-center mb-3'>
        <form className='flex items-center gap-2'>
          <TextInput placeholder='제목을 입력하세요.' className='w-[300px]' />
          <Button height={48} className='w-fit'>
            검색
          </Button>
        </form>

        <Link href={appRoutes.board.write}>
          <Button height={48} className='w-fit'>
            글쓰기
          </Button>
        </Link>
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
              <TableCell colSpan={boardColumns.length} className='text-center'>
                게시글이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
