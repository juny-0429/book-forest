'use client';

import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import { userManagementColumns } from './_data/userManagement.data';
import { UserManagementTableColumn } from 'src/types/table/userManagementTable.types';

const mockUserManagementData: UserManagementTableColumn[] = [
  {
    id: 1,
    userId: 'user_001',
    userName: '김철수',
    nickName: '철수짱',
    email: 'chulsu@example.com',
    phone: '010-1234-5678',
    createDate: '2025-03-01',
    membershipLevel: '일반회원',
    smsConsent: true,
    emailConsent: false,
    isActive: true,
  },
  {
    id: 2,
    userId: 'user_002',
    userName: '이영희',
    nickName: '영희짱',
    email: 'younghee@example.com',
    phone: '010-9876-5432',
    createDate: '2025-02-25',
    membershipLevel: 'VIP',
    smsConsent: false,
    emailConsent: true,
    isActive: true,
  },
  {
    id: 3,
    userId: 'admin',
    userName: '관리자',
    nickName: '관리봇',
    email: 'admin@example.com',
    phone: '010-1111-2222',
    createDate: '2025-01-15',
    membershipLevel: '관리자',
    smsConsent: true,
    emailConsent: true,
    isActive: false,
  },
];

export default function UserManagementPage() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: mockUserManagementData,
    columns: userManagementColumns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div>
      <h2 className='text-title-32b text-ui-text-title mb-10'>회원 관리 목록</h2>

      <div className='flex flex-col gap-2'>
        <form className='flex items-center gap-2'>
          <TextInput placeholder='회원명을 입력하세요.' className='w-[300px]' />
          <Button height={48} className='w-fit'>
            검색
          </Button>
        </form>

        <div className='flex w-full overflow-x-scroll scrollbar-show'>
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
                  <TableCell colSpan={mockUserManagementData.length} className='text-center'>
                    게시글이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
