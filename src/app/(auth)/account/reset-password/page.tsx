import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import LucideIcons from 'src/theme/lucideIcon';
import Button from 'src/components/Button/Button';
import SignupPasswordInput from '../../signup/_components/SignupPasswordInput';
import TextInput from 'src/components/TextInput/TextInput';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';

// todo: 기존과 동일한 비밀번호를 사용할수 없습니다. 모달창 추가
export default function ResetPasswordPage() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
      </Link>

      <div className='flex flex-col items-center gap-[46px] w-[400px]'>
        <h1 className='text-title-24b text-ui-text-title'>새로운 비밀번호를 설정해주세요.</h1>

        <div className='flex flex-col items-center gap-[40px]'>
          <LucideIcons.User size={100} strokeWidth={1} className='p-4 text-white bg-ui-main rounded-full shadow-blur-6-50' />

          <form className='flex flex-col gap-10'>
            <label>
              <span className='text-body-18b text-ui-text-title'>새로운 비밀번호</span>
              <SignupPasswordInput className='mt-2' />
            </label>

            <label>
              <span className='text-body-18b text-ui-text-title'>새로운 비밀번호 확인</span>
              <TextInput type='password' className='mt-2' />
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            </label>

            <Button type='submit' height={48} className='mt-10'>
              비밀번호 변경
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
