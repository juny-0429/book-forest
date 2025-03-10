'use client';

import React, { useState } from 'react';
import TextInput from 'src/components/TextInput/TextInput';
import SignupPasswordInput from './SignupPasswordInput';
import Button from 'src/components/Button/Button';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { SignupSchema } from '../_schemas/signup.schema';

interface UserInformationFormProps {
  register: UseFormRegister<SignupSchema>;
  errors: FieldErrors<SignupSchema>;
  watch: UseFormWatch<SignupSchema>;
}

export default function UserInformationForm({ register, errors, watch }: UserInformationFormProps) {
  const [isUserIdChecked, setIsUserIdChecked] = useState(false); // 아이디 중복 여부
  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean | null>(null); // 아이디 사용 가능 여부
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 인증번호 전송 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [otp, setOtp] = useState(''); // 이메일 인증번호

  const id = watch('id');
  const email = watch('email');

  // 아이디 중복 체크
  const handleCheckUserId = async () => {
    if (!id) return alert('아이디를 입력해주세요.');

    try {
      const response = await fetch(`/api/auth/signup/check-userid?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        setIsUserIdChecked(true);
        setIsUserIdAvailable(data.available);
      } else {
        alert(`오류 발생: ${data.error}`);
      }
    } catch (error) {
      console.error('아이디 중복 확인 오류:', error);
      alert('아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 이메일 인증 코드 전송
  const handleSendOtp = async () => {
    if (!email) return alert('이메일을 입력해주세요.');

    try {
      const response = await fetch('/api/auth/signup/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('이메일로 인증번호가 전송되었습니다.');
        setIsEmailSent(true);
      } else {
        alert(`이메일 전송 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('OTP 전송 오류:', error);
      alert('이메일 인증 요청 중 오류가 발생했습니다.');
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyOtp = async () => {
    if (!otp) return alert('인증번호를 입력해주세요.');

    try {
      const response = await fetch('/api/auth/signup/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('이메일 인증이 완료되었습니다!');
        setIsEmailVerified(true);
      } else {
        alert(`인증 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('OTP 인증 오류:', error);
      alert('이메일 인증 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <section>
      <div className='flex flex-col gap-[40px]'>
        {/* 아이디 */}
        <label className='flex flex-col gap-2 w-full'>
          <span className='text-body-18b text-ui-text-title'>아이디</span>
          <p className='text-body-12m text-ui-text-description'>4자~12자리의 영문자, 숫자 / @,#$ 등 특수문자는 제외</p>

          <div>
            <div className='flex items-center gap-1 w-full'>
              <TextInput {...register('id')} autoComplete='username' placeholder='아이디' />
              <Button type='button' height={48} onClick={handleCheckUserId} className='w-fit'>
                중복확인
              </Button>
            </div>
            {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
          </div>

          {isUserIdChecked && (
            <p className={`text-body-12m ${isUserIdAvailable ? 'text-state-success' : 'text-state-error'}`}>{isUserIdAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'}</p>
          )}
        </label>

        {/* 비밀번호 */}
        <SignupPasswordInput register={register} errors={errors} />

        {/* 이름 */}
        <label className='flex flex-col gap-2 w-full'>
          <span className='text-body-18b text-ui-text-title'>이름</span>
          <TextInput {...register('user_name')} placeholder='이름' />
        </label>

        {/* 전화번호 */}
        <label className='flex flex-col gap-2 w-full'>
          <span className='text-body-18b text-ui-text-title'>전화번호</span>
          <p className='text-body-12m text-ui-text-description'>'-'를 포함한 전화번호 입력</p>
          <TextInput type='tel' {...register('user_phone')} placeholder='전화번호' maxLength={13} />
        </label>

        {/* 이메일 */}
        <fieldset className='flex flex-col gap-1'>
          <legend className='text-body-18b text-ui-text-title'>이메일</legend>
          <label className='flex flex-col gap-2'>
            <div className='flex justify-center items-center gap-1 mt-2'>
              <TextInput type='email' {...register('email')} placeholder='이메일' autoComplete='email' disabled={isEmailSent} />
              <Button type='button' height={48} onClick={handleSendOtp} disabled={isEmailSent} className='w-fit'>
                {isEmailSent ? '인증번호 전송됨' : '인증번호 요청'}
              </Button>
            </div>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </label>

          {isEmailSent && (
            <label className='flex justify-end items-center gap-1 w-full'>
              <TextInput type='text' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='6자리 인증번호 입력' disabled={isEmailVerified} className='w-[200px]' />
              <Button type='button' height={48} onClick={handleVerifyOtp} disabled={isEmailVerified} className='w-fit'>
                {isEmailVerified ? '인증 완료' : '인증 확인'}
              </Button>
            </label>
          )}
        </fieldset>
      </div>

      <Button type='submit' height={48} className='mt-[60px]'>
        회원가입하기
      </Button>
    </section>
  );
}
