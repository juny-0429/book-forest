'use client';

import { useState } from 'react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/Table/Table';
import { useAlertModal, useCustomModal } from 'src/hooks/useModal';
import AddCategoryModalContent from './_components/AddCategoryModalContent';
import { useGetCategoryList } from './_hooks/react-query/useGetCategoryList';
import { categoriesColumns } from './_data/categories.columns';
import { useUpdateCategory } from './_hooks/react-query/useUpdateCategory';
import { UpdateCategoryDto } from './_dtos/updateCategory.dto';
import { useDeleteCategory } from './_hooks/react-query/useDeleteCategory';

export default function CategoriesPage() {
  const [editingRowId, setEditingRowId] = useState<string | null>(null); // 현재 수정 중인 행의 ID
  const [editedValues, setEditedValues] = useState<UpdateCategoryDto | null>(null); // 수정 중인 값들 저장

  const { openCustomModal } = useCustomModal();
  const { openAlertModal } = useAlertModal();

  const { data: categoryList } = useGetCategoryList('ALL'); // 카테고리 목록 조회
  const { mutate: updateCategory } = useUpdateCategory(); // 카테고리 수정
  const { mutate: deleteCategory } = useDeleteCategory(); // 카테고리 삭제

  const openAddCategoryModal = () => {
    openCustomModal({
      children: <AddCategoryModalContent />,
    });
  };

  const table = useReactTable({
    data: categoryList ?? [],
    columns: categoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onEditClick = (rowId: string, rowValues: any) => {
    setEditingRowId(rowId);
    setEditedValues({
      categoryId: rowValues.categoryId,
      categoryName: rowValues.categoryName,
      categoryCode: rowValues.categoryCode,
    });
  };

  const onInputChange = (field: keyof UpdateCategoryDto, value: string) => {
    setEditedValues((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const onSaveClick = () => {
    if (!editedValues) return;

    updateCategory(editedValues, {
      onSuccess: () => {
        setEditingRowId(null);
      },
      onError: (error) => {
        console.error('카테고리 수정 실패:', error);
      },
    });
  };

  const onCategoryDeleteClick = (categoryId: number) => {
    openAlertModal({
      content: '정말로 삭제하시겠습니까?',
      onConfirm: () =>
        deleteCategory(categoryId, {
          onError: () => {
            openAlertModal({
              content: '사용중인 카테고리 ID입니다.',
            });
          },
        }),
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
              <TableHead style={{ width: 150 }} />
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const isEditing = editingRowId === row.id;
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id as keyof UpdateCategoryDto;
                    const value = isEditing ? editedValues?.[columnId] : cell.getValue();

                    return (
                      <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {isEditing && (columnId === 'categoryName' || columnId === 'categoryCode') ? (
                          <input value={String(value ?? '')} onChange={(e) => onInputChange(columnId, e.target.value)} className='border border-solid border-gray-400 rounded px-2 py-1 w-full' />
                        ) : (
                          String(value ?? '')
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {isEditing ? (
                      <div className='flex justify-center items-center gap-1'>
                        <Button height={32} onClick={onSaveClick} className='w-fit'>
                          완료
                        </Button>
                        <Button height={32} onClick={() => setEditingRowId(null)} color='red' className='w-fit'>
                          취소
                        </Button>
                      </div>
                    ) : (
                      <div className='flex justify-center items-center gap-1'>
                        <LineButton height={32} onClick={() => onEditClick(row.id, row.original)} className='w-fit'>
                          수정
                        </LineButton>
                        <Button height={32} onClick={() => onCategoryDeleteClick(Number(row.original.categoryId))} color='red' className='w-fit'>
                          삭제
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
            <TableCell colSpan={5} className='text-center'>
                카테고리가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
