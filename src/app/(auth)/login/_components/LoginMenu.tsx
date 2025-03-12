import Link from 'next/link';
import React from 'react';
import { appRoutes } from 'src/routes/appRoutes';

export default function LoginMenu() {
  return (
    <nav>
      <ul className='flex justify-center items-center gap-4'>
        <li className='text-body-14m text-ui-text-title'>
          <Link href={appRoutes.account.forgotId}>아이디 찾기</Link>
        </li>

        <hr className='w-[1px] h-[10px] bg-gray-600' />

        <li className='text-body-14m text-ui-text-title'>
          <Link href={appRoutes.account.forgotPassword}>비밀번호 찾기</Link>
        </li>

        <hr className='w-[1px] h-[10px] bg-gray-600' />

        <li className='text-body-14m text-ui-text-title'>
          <Link href={appRoutes.signup}>회원가입</Link>
        </li>
      </ul>
    </nav>
  );
}
