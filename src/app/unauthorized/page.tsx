import Link from 'next/link';
import React from 'react';
import Button from 'src/components/Button/Button';

export default function UnauthorizedPage() {
  return (
    <div className='flex flex-col  justify-center items-center gap-5 w-full h-screen'>
      <h2 className='text-title-32b text-state-error text-center'>프로젝트 접근 권한이없습니다</h2>
      <p className='text-body-18r text-ui-text-body text-center'>
        해당 페이지에 접근할 권한이 없습니다. <br />
        관리자에게 문의해주세요.
      </p>

      <Link href='/'>
        <Button color='gray' className='w-[150px]'>
          홈으로 이동
        </Button>
      </Link>
    </div>
  );
}
