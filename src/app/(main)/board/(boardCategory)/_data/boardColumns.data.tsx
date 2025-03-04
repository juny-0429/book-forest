import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { BoardTableColumn } from 'src/types/table/boardTable.types';

export const boardColumns: ColumnDef<BoardTableColumn>[] = [
  { accessorKey: 'id', header: 'ID', size: 70 },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        제목
        <ArrowUpDown size={20} />
      </button>
    ),
    size: 500,
  },
  { accessorKey: 'userId', header: '작성자', size: 150 },
  { accessorKey: 'createdAt', header: '작성일', size: 250 },
];
