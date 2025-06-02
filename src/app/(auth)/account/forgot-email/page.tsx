'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import { useRouter } from 'next/navigation';
import { useFindIdStore } from 'src/store/useFindIdStore';
import { useFindEmail } from './_hooks/react-query/useFindEmail';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';

export default function ForgotEmailPage() {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setUserEmail } = useFindIdStore();
  const { mutate: findEmail } = useFindEmail();

  const onFindEmail = () => {
    setErrorMessage('');
    findEmail(
      { userName, userPhone },
      {
        onSuccess: (res) => {
          if (!res.userEmail) return setErrorMessage('일치하는 회원 정보를 찾을 수 없습니다.');

          setUserEmail(res.userEmail);
          router.push(appRoutes.account.forgotEmailResult);
        },
        onError: (err) => {
          setErrorMessage(err.message);
        },
      }
    );
  };

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' priority />
      </Link>

      <div className='flex flex-col justify-center items-center gap-[46px] w-[500px]'>
        <h1 className='text-title-24b text-ui-text-title'>이메일 찾기</h1>

        <form className='flex flex-col gap-[30px] w-full'>
          <label>
            <span className='text-body-18b text-ui-text-title'>이름</span>
            <TextInput type='text' placeholder='이름' className='mt-2' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <span className='text-body-18b text-ui-text-title'>전화번호</span>

            <div>
              <TextInput type='text' placeholder='010-0000-0000' className='mt-2' value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </div>
          </label>
        </form>

        <Button height={48} onClick={onFindEmail}>이메일 찾기</Button>
      </div>
    </div>
  );
}
