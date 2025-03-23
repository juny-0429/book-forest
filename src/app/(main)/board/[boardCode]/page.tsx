'use client';

import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import { appRoutes } from 'src/routes/appRoutes';
import Link from 'next/link';
import { boardColumns } from './_data/boardColumns.data';
import { useGetPostList } from './_hooks/react-qeury/useGetPostList';
import { useParams } from 'next/navigation';
import { BoardCategoryType } from 'src/types/boardCategory.types';
import { getBoardTitle } from './utils/boardTitle';
import { useRouter } from 'next/navigation';

export default function BoardPage() {
  const { boardCode } = useParams();
  const upperBoardCode = (boardCode as string)?.toUpperCase() as BoardCategoryType;
  const { data: eventPostList } = useGetPostList(upperBoardCode);
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const table = useReactTable({
    data: eventPostList ?? [],
    columns: boardColumns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div>
      <h2 className='text-title-24b text-ui-text-title mb-[50px]'>{getBoardTitle(upperBoardCode)}</h2>

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
              <TableRow key={row.id} className='cursor-pointer' onClick={() => router.push(`/board/${boardCode}/${row.original.postId}`)}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={cell.column.id === 'postTitle' ? 'text-left' : 'text-center'}>
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
