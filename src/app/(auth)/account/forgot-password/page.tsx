import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';

// todo:일치하는 정보가 없습니다 모달창 만들기
export default function ForgotPasswordPage() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
      </Link>

      <div className='flex flex-col justify-center items-center gap-[46px] w-[500px]'>
        <h1 className='text-title-24b text-ui-text-title'>비밀번호 재설정</h1>

        <form className='flex flex-col gap-[30px] w-full'>
          <label>
            <span className='text-body-18b text-ui-text-title'>이름</span>

            <TextInput type='text' placeholder='이름' className='mt-2' />
          </label>

          <label>
            <span className='text-body-18b text-ui-text-title'>아이디</span>

            <TextInput type='text' placeholder='아이디' className='mt-2' />
          </label>

          <label>
            <span className='text-body-18b text-ui-text-title'>이메일</span>

            <div className='flex justify-center items-center gap-1 mt-2'>
              <TextInput type='email' placeholder='이메일' />

              <Button type='button' height={48} className='w-fit'>
                인증요청
              </Button>
            </div>
            <ErrorMessage>유효한 이메일 주소가 아닙니다</ErrorMessage>
          </label>
        </form>

        <Button type='submit' height={48}>
          비밀번호 재설정
        </Button>
      </div>

      <p className='fixed bottom-5 text-caption-12b text-ui-text-caption'>© Book Forest, All Rights Reserved.</p>
    </div>
  );
}
