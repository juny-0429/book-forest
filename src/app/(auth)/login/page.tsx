'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import Link from 'next/link';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import { appRoutes } from 'src/routes/appRoutes';
import LucideIcons from 'src/theme/lucideIcon';

export default function LoginPage() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center gap-10 w-full h-screen'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={160} alt='logo image' />
      </Link>

      <form className='flex flex-col items-center w-[350px]'>
        <TextInput type='text' placeholder='아이디를 입력하세요' />
        <TextInput
          type={isPasswordShow ? 'text' : 'password'}
          placeholder='비밀번호를 입력하세요'
          rightIcon={
            <button type='button' onClick={() => setIsPasswordShow((prev) => !prev)}>
              {isPasswordShow ? <LucideIcons.EyeOff /> : <LucideIcons.Eye />}
            </button>
          }
          className='mt-[10px]'
        />

        <Button height={48} type='submit' className='w-full mt-10'>
          로그인
        </Button>
      </form>

      <nav>
        <ul className='flex justify-center items-center gap-4'>
          <li className='text-body-14m text-ui-text-title'>
            <Link href={appRoutes.find.id}>아이디 찾기</Link>
          </li>

          <hr className='w-[1px] h-[10px] bg-gray-600' />

          <li className='text-body-14m text-ui-text-title'>
            <Link href={appRoutes.find.password}>비밀번호 찾기</Link>
          </li>

          <hr className='w-[1px] h-[10px] bg-gray-600' />

          <li className='text-body-14m text-ui-text-title'>
            <Link href={appRoutes.signup}>회원가입</Link>
          </li>
        </ul>
      </nav>

      {/* 소셜 로그인 */}
      <div className='flex flex-col items-center gap-4'>
        <p className='text-body-16m text-ui-text-description'>소셜 계정으로 간편 로그인</p>
        <div className='flex justify-center items-center gap-5'>
          {/* 네이버 로그인 버튼 */}
          <button type='button' className="w-12 h-12 bg-[url('/assets/images/login/naver-login.png')] bg-cover bg-center rounded-full"></button>
          {/* 카카오 로그인 버튼 */}
          <button type='button' className="w-12 h-12 bg-[url('/assets/images/login/kakao-login.png')] bg-cover bg-center rounded-full"></button>
          {/* 구글 로그인 버튼 */}
          <button
            type='button'
            className='flex items-center justify-center border border-gray-400 bg-white text-gray-800 font-roboto text-sm h-12 px-4 py-0 w-12 rounded-full hover:bg-gray-100 focus:outline-none transition-all duration-300'
          >
            <div className='flex items-center justify-center'>
              <svg className='w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
                <path fill='#EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'></path>
                <path fill='#4285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'></path>
                <path fill='#FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'></path>
                <path fill='#34A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'></path>
                <path fill='none' d='M0 0h48v48H0z'></path>
              </svg>
              <span className='sr-only'>Sign in with Google</span>
            </div>
          </button>
        </div>
      </div>

      <p className='fixed bottom-5 text-caption-12b text-ui-text-caption'>© Book Forest, All Rights Reserved.</p>
    </div>
  );
}
