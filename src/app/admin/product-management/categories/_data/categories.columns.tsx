import { ColumnDef } from '@tanstack/react-table';
import { CategoryColumnType } from 'src/types/table/category.types';

export const categoriesColumns: ColumnDef<CategoryColumnType>[] = [
  { accessorKey: 'categoryId', header: 'No', size: 30 },
  { accessorKey: 'categoryName', header: '카테고리 이름', size: 150 },
  { accessorKey: 'categoryCode', header: '카테고리 코드', size: 150 },
  { accessorKey: 'parentName', header: '상위 분류', size: 150 },
];
