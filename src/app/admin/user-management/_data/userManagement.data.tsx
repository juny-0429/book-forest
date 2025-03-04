import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { UserManagementTableColumn } from 'src/types/table/userManagementTable.types';
import { Badge } from 'src/components/Badge/Badge';
import { cn } from 'src/lib/utils';
import LineButton from 'src/components/Button/LineButton';

export const userManagementColumns: ColumnDef<UserManagementTableColumn>[] = [
  { accessorKey: 'id', header: 'No', size: 30 },
  {
    accessorKey: 'userId',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        회원 아이디
        <ArrowUpDown size={16} />
      </button>
    ),
    size: 120,
    enableSorting: true,
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        회원명
        <ArrowUpDown size={16} />
      </button>
    ),
    size: 90,
    enableSorting: true,
  },
  {
    accessorKey: 'nickName',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        닉네임
        <ArrowUpDown size={16} />
      </button>
    ),
    size: 120,
    enableSorting: true,
  },
  { accessorKey: 'email', header: '이메일', size: 190 },
  { accessorKey: 'phone', header: '연락처', size: 100 },
  {
    accessorKey: 'createDate',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        가입일
        <ArrowUpDown size={16} />
      </button>
    ),
    size: 130,
    enableSorting: true,
  },
  {
    accessorKey: 'membershipLevel',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        회원등급
        <ArrowUpDown size={16} />
      </button>
    ),
    size: 70,
    enableSorting: true,
    cell: ({ row }) => {
      const level = row.original.membershipLevel;

      return <Badge>{level}</Badge>;
    },
  },
  {
    accessorKey: 'smsConsent',
    header: '문자수신동의',
    size: 90,
    cell: ({ row }) => {
      const isConsent = row.original.smsConsent;
      return <span className={isConsent ? '' : 'text-red-500'}>{isConsent ? 'Y' : 'N'}</span>;
    },
  },
  {
    accessorKey: 'emailConsent',
    header: '이메일수신동의',
    size: 100,
    cell: ({ row }) => {
      const isConsent = row.original.emailConsent;
      return <span className={isConsent ? '' : 'text-red-500'}>{isConsent ? 'Y' : 'N'}</span>;
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <button className='flex items-center gap-1' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        회원 상태
        <ArrowUpDown size={16} />
      </button>
    ),
    size: 70,
    enableSorting: true,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return <span className={cn('font-bold', isActive ? 'text-green-500' : 'text-red-500')}>{isActive ? '활성' : '탈퇴'}</span>;
    },
  },
  {
    accessorKey: 'actions',
    header: '회원 탈퇴',
    size: 150,
    cell: ({ row }) => (
      <LineButton height={32} className='w-fit'>
        탈퇴
      </LineButton>
    ),
  },
];
