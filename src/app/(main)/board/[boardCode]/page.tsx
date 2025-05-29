'use client';

import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import Button from 'src/components/Button/Button';
import { appRoutes } from 'src/routes/appRoutes';
import Link from 'next/link';
import { boardColumns } from './_data/boardColumns.data';
import { useGetPostList } from './_hooks/react-qeury/useGetPostList';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { BoardCategoryType } from 'src/types/boardCategory.types';
import { getBoardTitle } from './utils/boardTitle';
import SearchBar from 'src/components/SearchBar/SearchBar';
import { useAlertModal } from 'src/hooks/useModal';

export default function BoardPage() {
  const [inputKeyword, setInputKeyword] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const { openAlertModal } = useAlertModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { boardCode } = useParams();
  const keyword = searchParams.get('keyword') ?? '';
  const upperBoardCode = (boardCode as string)?.toUpperCase() as BoardCategoryType;

  const { data: eventPostList } = useGetPostList(upperBoardCode, keyword);

  const table = useReactTable({
    data: eventPostList ?? [],
    columns: boardColumns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const onSearch = () => {
    const trimmed = inputKeyword.trim();

    if (trimmed.length < 2) {
      openAlertModal({
        content: '검색어는 두 글자 이상 입력해주세요.',
      });

      const params = new URLSearchParams(searchParams.toString());
      params.delete('keyword');
      router.push(`?${params.toString()}`);

      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('keyword', trimmed);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setInputKeyword(keyword);
  }, [keyword]);

  return (
    <div>
      <h2 className='text-title-24b text-ui-text-title mb-[50px]'>{getBoardTitle(upperBoardCode)}</h2>

      <div className='flex justify-between items-center mb-3'>
        <SearchBar
          placeholder='제목을 검색하세요'
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          onSearch={onSearch}
          className='w-[300px]'
        />
        <Link href={appRoutes.board.write}>
          <Button type='button' height={48} className='w-fit'>
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
