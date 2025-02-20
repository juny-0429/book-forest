import React from 'react';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';

export default function FindIdPage() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex flex-col justify-center items-center w-fit h-fit gap-10 mb-[120px]'>
        <Link href={appRoutes.home}>
          <Image src={KoLogo} alt='logo  image' className='w-[160px]' />
        </Link>

        <h1 className='text-title-24r text-ui-text-title text-center'>
          본인인증정보와 일치하는 아이디입니다.
          <br />
          로그인후 이용해주세요.
        </h1>

        <div className='flex flex-col w-fit gap-10'>
          <div className='flex flex-col items-center gap-5 w-fit px-[100px] py-[20px] bg-gray-200 rounded-[10px]'>
            <span className='text-body-18b text-ui-text-title'>juny_0429</span>
            <p className='text-body-16m text-ui-text-description'>가입일: 2025.02.05</p>
          </div>

          <div className='flex justify-center items-center gap-2'>
            <Button height={48}>로그인</Button>
            <LineButton height={48}>비밀번호재설정</LineButton>
          </div>
        </div>
      </div>
    </div>
  );
}
