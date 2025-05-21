'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // 홈으로 이동
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
      <h1 className='text-title-32b text-red-600'>페이지를 찾을 수 없습니다.</h1>
      <p className='text-body-16r text-gray-600'>3초 후 홈으로 이동합니다...</p>
    </div>
  );
}
