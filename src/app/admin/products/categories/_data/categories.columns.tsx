import { ColumnDef } from '@tanstack/react-table';
import { CategoryColumnType } from 'src/types/table/category.types';
import LineButton from 'src/components/Button/LineButton';
import Button from 'src/components/Button/Button';

export const categoriesColumns: ColumnDef<CategoryColumnType>[] = [
  { accessorKey: 'categoryId', header: 'No', size: 30 },
  { accessorKey: 'categoryName', header: '카테고리 이름', size: 150 },
  { accessorKey: 'categoryCode', header: '카테고리 코드', size: 150 },
  { accessorKey: 'parentName', header: '상위 분류', size: 150 },
  {
    accessorKey: 'actions',
    header: '',
    size: 150,
    cell: ({ row }) => (
      <div className='flex justify-center items-center gap-1'>
        <LineButton height={32} className='w-fit'>
          수정
        </LineButton>
        <Button height={32} color='red' className='w-fit'>
          삭제
        </Button>
      </div>
    ),
  },
];
