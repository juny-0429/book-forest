import { ColumnDef } from '@tanstack/react-table';
import { GetProductListDto } from '../_dtos/getProductList.dto';
import dayjs from 'dayjs';

export const productColumns: ColumnDef<GetProductListDto>[] = [
  { accessorKey: 'productId', header: 'No', size: 70 },
  { accessorKey: 'productName', header: '상품명', size: 150 },
  { accessorKey: 'authorName', header: '작가명', size: 120 },
  { accessorKey: 'publisher', header: '출판사', size: 120 },
  {
    accessorKey: 'publishedDate',
    header: '출판일',
    size: 100,
    cell: ({ getValue }) => dayjs(getValue<Date>()).format('YYYY.MM.DD'),
  },
  { accessorKey: 'isbn', header: 'ISBN', size: 130 },
  {
    accessorKey: 'price',
    header: '가격',
    size: 100,
    cell: ({ getValue }) => getValue<number>().toLocaleString(),
  },
  {
    accessorKey: 'discount',
    header: '할인율',
    size: 100,
    cell: ({ getValue }) => `${getValue<number>()}%`,
  },
  { accessorKey: 'stock', header: '재고', size: 100 },
  {
    accessorKey: 'deliveryPrice',
    header: '배송비',
    size: 100,
    cell: ({ getValue }) => getValue<number>().toLocaleString(),
  },
  { accessorKey: 'isActive', header: '활성화 여부', size: 120 },
];
