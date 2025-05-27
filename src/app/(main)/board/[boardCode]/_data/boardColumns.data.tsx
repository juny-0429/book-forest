import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { GetPostItemDto } from '../_dtos/getPostList.dto';
import dayjs from 'dayjs';

export const boardColumns: ColumnDef<GetPostItemDto>[] = [
  { accessorKey: 'postId', header: 'ID', size: 70 },
  {
    accessorKey: 'postTitle',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        제목
        <ArrowUpDown size={20} />
      </button>
    ),
    size: 500,
  },
  { accessorKey: 'accountId', header: '작성자', size: 150 },
  {
    accessorKey: 'createAt',
    header: '작성일',
    size: 250,
    cell: ({ row }) => dayjs(row.original.createAt).format('YYYY/MM/DD HH:mm'),
  },
];
