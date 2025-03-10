'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import Link from 'next/link';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import { appRoutes } from 'src/routes/appRoutes';
import LucideIcons from 'src/theme/lucideIcon';
import LoginMenu from './_components/LoginMenu';
import SnsLoginButtons from './_components/SnsLoginButtons';

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
              {isPasswordShow ? <LucideIcons.Eye /> : <LucideIcons.EyeOff />}
            </button>
          }
          className='mt-[10px]'
        />

        <Button height={48} type='submit' className='w-full mt-10'>
          로그인
        </Button>
      </form>

      <LoginMenu />
      <SnsLoginButtons />

      <p className='fixed bottom-5 text-caption-12b text-ui-text-caption'>© Book Forest, All Rights Reserved.</p>
    </div>
  );
}
