'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';
import { useValidateUserForFindId } from './_hooks/react-query/ValidateUserForFindIdArgs';
import { useSendOtpForFindId } from './_hooks/react-query/SendOtpForFindIdArgs';
import { useVerifyOtpForFindId } from './_hooks/react-query/VerifyOtpForFindIdArgs';
import { useRouter } from 'next/navigation';
import { useFindIdStore } from 'src/store/useFindIdStore';

export default function ForgotIdPage() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 전송 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증번호 성공 여부
  const [otp, setOtp] = useState('');

  const router = useRouter();
  const { setUserInfo } = useFindIdStore();

  const { mutate: validateUserForFindId } = useValidateUserForFindId();
  const { mutate: sendOtpForFindId } = useSendOtpForFindId();
  const { mutate: verifyOtpForFindIdArgs } = useVerifyOtpForFindId();

  const onRequestVerification: () => void | Promise<void> = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setEmailError('유효한 이메일 주소가 아닙니다');
      return;
    }

    validateUserForFindId(
      { userName, userEmail },
      {
        onSuccess: (res) => {
          if (!res.match) {
            setEmailError('일치하는 회원 정보가 없습니다');
          } else {
            sendOtpForFindId(
              { email: userEmail },
              {
                onSuccess: () => {
                  setIsEmailSent(true);
                },
              }
            );
          }
        },
      }
    );
  };

  const onVerifyOtp = () => {
    if (!otp) return alert('인증번호를 입력해주세요.');

    verifyOtpForFindIdArgs(
      { email: userEmail, otp: otp },
      {
        onSuccess: () => {
          setIsEmailVerified(true);
        },
        onError: (error) => {
          alert(`인증 실패: ${(error as Error).message}`);
        },
      }
    );
  };

  const onFindIdConfirm = () => {
    setUserInfo({ userName, userEmail });
    router.push(appRoutes.account.forgotIdResult);
  };

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' priority />
      </Link>

      <div className='flex flex-col justify-center items-center gap-[46px] w-[500px]'>
        <h1 className='text-title-24b text-ui-text-title'>아이디 찾기</h1>

        <form className='flex flex-col gap-[30px] w-full'>
          <label>
            <span className='text-body-18b text-ui-text-title'>이름</span>
            <TextInput type='text' placeholder='이름' className='mt-2' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>

          <fieldset className='flex flex-col gap-2'>
            <legend className='text-body-18b text-ui-text-title'>이메일 인증</legend>

            <div className='flex justify-center items-center gap-1 mt-2'>
              <TextInput
                type='email'
                placeholder='이메일'
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setEmailError('');
                }}
              />
              <Button type='button' height={48} onClick={onRequestVerification} disabled={!userName || !userEmail || isEmailSent} className='w-fit'>
                인증요청
              </Button>
            </div>

            {isEmailSent && (
              <div className='flex justify-end items-center gap-1 w-full'>
                <TextInput type='number' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='6자리 인증번호 입력' disabled={isEmailVerified} className='w-[200px]' />
                <Button type='button' height={48} onClick={onVerifyOtp} disabled={isEmailVerified} className='w-fit'>
                  {isEmailVerified ? '인증완료' : '인증확인'}
                </Button>
              </div>
            )}

            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </fieldset>
        </form>

        <Button type='button' height={48} disabled={!isEmailVerified} onClick={onFindIdConfirm}>
          아이디 찾기
        </Button>
      </div>
    </div>
  );
}
