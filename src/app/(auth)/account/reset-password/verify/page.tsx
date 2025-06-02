'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';
import { useForm, useWatch } from 'react-hook-form';
import { forgotPasswordVerifySchema, ForgotPasswordVerifySchema } from './_schemas/forgotPasswordVerify.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVerifyResetPasswordUser } from './_hooks/react-query/useVerifyResetPasswordUser';
import { useSendOtpForFindId } from '../../forgot-id/_hooks/react-query/SendOtpForFindIdArgs';
import { useVerifyOtpForFindId } from '../../forgot-id/_hooks/react-query/VerifyOtpForFindIdArgs';
import { useAlertModal } from 'src/hooks/useModal';
import { useSendResetPasswordLink } from './_hooks/react-query/useSendResetPasswordLink';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 전송 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증번호 성공 여부
  const [otp, setOtp] = useState('');
  const { openAlertModal } = useAlertModal();
  const router = useRouter();

  const { register, control } = useForm<ForgotPasswordVerifySchema>({
    resolver: zodResolver(forgotPasswordVerifySchema),
  });

  const userName = useWatch({ control, name: 'userName' });
  const accountId = useWatch({ control, name: 'accountId' });
  const userEmail = useWatch({ control, name: 'userEmail' });

  const { mutate: verifyUser } = useVerifyResetPasswordUser();
  const { mutate: sendOtpForFindId } = useSendOtpForFindId();
  const { mutate: verifyOtpForFindIdArgs } = useVerifyOtpForFindId();
  const { mutate: sendResetPasswordLink } = useSendResetPasswordLink();

  const onRequestVerification = () => {
    verifyUser(
      { userName, accountId, userEmail },
      {
        onSuccess: (match) => {
          if (!match) {
            setErrorMessage('입력하신 정보와 일치하는 회원을 찾을 수 없습니다.');
            return;
          }
          setErrorMessage('');
          sendOtpForFindId(
            { email: userEmail },
            {
              onSuccess: () => {
                setIsEmailSent(true);
              },
            }
          );
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
        onError: () => {
          openAlertModal({
            content: '인증에 실패하였습니다.',
          });
        },
      }
    );
  };

  const onRequestResetPasswordLink = () => {
    sendResetPasswordLink(userEmail, {
      onSuccess: () => {
        openAlertModal({ content: '비밀번호 재설정 링크가 이메일로 전송되었습니다.' });
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      },
      onError: () => {
        openAlertModal({
          content: '메일 전송 중 오류가 발생했습니다.',
        });
      },
    });
  };

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
      </Link>

      <div className='flex flex-col justify-center items-center gap-[46px] w-[500px]'>
        <h1 className='text-title-24b text-ui-text-title'>비밀번호 찾기</h1>

        <form className='flex flex-col gap-[30px] w-full'>
          <label>
            <span className='text-body-18b text-ui-text-title'>이름</span>
            <TextInput type='text' {...register('userName')} placeholder='이름' className='mt-2' />
          </label>

          <label>
            <span className='text-body-18b text-ui-text-title'>아이디</span>

            <div className='relative'>
              <TextInput type='text' {...register('accountId')} placeholder='아이디' className='mt-2' />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </div>
          </label>

          <fieldset className='flex flex-col gap-2'>
            <legend className='text-body-18b text-ui-text-title'>이메일 인증</legend>
            <div className='flex justify-center items-center gap-1 mt-2'>
              <TextInput type='email' placeholder='이메일' {...register('userEmail')} disabled={isEmailSent} />
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
          </fieldset>
        </form>

        <Button type='button' height={48} disabled={!isEmailVerified} onClick={onRequestResetPasswordLink}>
          비밀번호 재설정
        </Button>
      </div>
    </div>
  );
}
