'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from 'src/components/Pagination/pagination';

interface ProductPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  groupSize?: number;
}

export default function ProductPagination({ currentPage, totalItems, itemsPerPage = 10, groupSize = 5 }: ProductPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const pageRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 페이지 이동 함수 (쿼리스트링 수정)
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => goToPage(Math.max(currentPage - 1, 1))} />
        </PaginationItem>

        {pageRange.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === currentPage} onClick={() => goToPage(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={() => goToPage(Math.min(currentPage + 1, totalPages))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
