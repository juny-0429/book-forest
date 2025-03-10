'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 쿼리 데이터를 60초 동안 stale 상태로 설정
        refetchOnWindowFocus: false, // 윈도우 포커스 시 쿼리 리패치 방지
        refetchOnMount: false, // 마운트 시 쿼리 리패치 방지
        retry: 1, // API 요청 실패 시 재시도 횟수
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = browserQueryClient ?? makeQueryClient();

  if (typeof window !== 'undefined') {
    browserQueryClient = browserQueryClient ?? makeQueryClient();
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
