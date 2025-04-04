import { ColumnDef } from '@tanstack/react-table';
import { GetProductListDto } from '../_dtos/getProductList.dto';
import dayjs from 'dayjs';
import { Switch } from 'src/components/Switch/Switch';
import { useUpdateProductStatus } from '../_hooks/react-query/useUpdateProductStatus';

export const useProductColumns = (page: number) => {
  const { mutate: updateProductStatus } = useUpdateProductStatus();

  const columns: ColumnDef<GetProductListDto>[] = [
    { accessorKey: 'productId', header: 'No', size: 70 },
    {
      accessorKey: 'productName',
      header: '상품명',
      size: 300,
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <div className='truncate' style={{ maxWidth: '300px' }}>
            {value}
          </div>
        );
      },
    },
    { accessorKey: 'authorName', header: '작가명', size: 100 },
    { accessorKey: 'publisher', header: '출판사', size: 200 },
    {
      accessorKey: 'publishedDate',
      header: '출판일',
      size: 130,
      cell: ({ getValue }) => dayjs(getValue<Date>()).format('YYYY/MM/DD'),
    },
    { accessorKey: 'isbn', header: 'ISBN', size: 200 },
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
    {
      accessorKey: 'isActive',
      header: '활성화 여부',
      size: 100,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <Switch
            checked={product.isActive}
            onCheckedChange={() => {
              const next = !product.isActive;

              updateProductStatus({
                updateProductId: product.productId,
                isActive: next,
                page,
              });
            }}
          />
        );
      },
    },
  ];

  return columns;
};
