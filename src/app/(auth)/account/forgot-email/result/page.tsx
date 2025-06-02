'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import { useFindIdStore } from 'src/store/useFindIdStore';

export default function FindEmailResultPage() {
  const { foundUserEmail, clearUserEmail } = useFindIdStore();
  const router = useRouter();

  useEffect(() => {
    if (!foundUserEmail) {
      router.push(appRoutes.home);
    }
  }, [foundUserEmail, router]);

  useEffect(() => {
    return () => {
      clearUserEmail();
    };
  }, []);

  if (!foundUserEmail) return null;

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex flex-col justify-center items-center w-fit h-fit gap-10 mb-[120px]'>
        <Link href={appRoutes.home}>
          <Image src={KoLogo} width={160} height={100} alt='logo image' priority />
        </Link>

        <h1 className='text-title-24r text-ui-text-title text-center'>
          본인인증정보와 일치하는 이메일입니다.
          <br />
          로그인 후 이용해주세요.
        </h1>

        <div className='flex flex-col w-fit gap-10'>
          <div className='flex flex-col items-center gap-5 w-fit px-[100px] py-[20px] bg-gray-200 rounded-[10px]'>
            <span className='text-body-18b text-ui-text-title'>{foundUserEmail}</span>
          </div>

          <div className='flex justify-center items-center gap-2'>
            <Link href={appRoutes.login}>
              <Button height={48} className='w-[150px]'>
                로그인
              </Button>
            </Link>

            <Link href={appRoutes.account.resetPasswordVerify}>
              <LineButton height={48} className='w-[150px]'>
                비밀번호 재설정
              </LineButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
