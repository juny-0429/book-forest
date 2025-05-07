'use client';

import React, { useEffect, useState } from 'react';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import { useFindIdStore } from 'src/store/useFindIdStore';
import { useGetUserInfo } from './_hooks/react-query/useGetUserInfo';
import dayjs from 'dayjs';

export default function FindIdPage() {
  const [accountId, setAccountId] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const { foundUserName, foundUserEmail } = useFindIdStore();
  const { mutate: getUserInfo } = useGetUserInfo();

  useEffect(() => {
    if (!foundUserName || !foundUserEmail) {
      setIsValidAccess(false);
      return;
    }

    setIsValidAccess(true);

    getUserInfo(
      { userName: foundUserName, userEmail: foundUserEmail },
      {
        onSuccess: (data) => {
          setAccountId(data.accountId);
          setCreatedAt(new Date(data.createdAt).toLocaleDateString('ko-KR'));
        },
      }
    );
  }, [foundUserName, foundUserEmail, getUserInfo]);

  if (!isValidAccess) {
    return (
      <div className='flex flex-col justify-center items-center gap-5 w-full h-screen'>
        <p className='text-title-32b text-state-error'>잘못된 접근입니다.</p>
        <Link href={appRoutes.home}>
          <Button height={48} className='w-fit'>
            홈으로 가기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex flex-col justify-center items-center w-fit h-fit gap-10 mb-[120px]'>
        <Link href={appRoutes.home}>
          <Image src={KoLogo} width={160} height={100} alt='logo image' priority />
        </Link>

        <h1 className='text-title-24r text-ui-text-title text-center'>
          본인인증정보와 일치하는 아이디입니다.
          <br />
          로그인후 이용해주세요.
        </h1>

        <div className='flex flex-col w-fit gap-10'>
          <div className='flex flex-col items-center gap-5 w-fit px-[100px] py-[20px] bg-gray-200 rounded-[10px]'>
            <span className='text-body-18b text-ui-text-title'>{accountId}</span>
            <p className='text-body-16m text-ui-text-description'>가입일: {dayjs(createdAt).format('YYYY.MM.DD')}</p>
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
