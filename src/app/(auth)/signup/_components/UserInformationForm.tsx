'use client';

import React, { useState } from 'react';
import TextInput from 'src/components/TextInput/TextInput';
import SignupPasswordInput from './SignupPasswordInput';
import Button from 'src/components/Button/Button';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { SignupSchema } from '../_schemas/signup.schema';
import { useAccountIdValidation } from '../_hooks/useAccountIdValidation';
import { useSendOtp } from '../_hooks/react-query/useSendOtp';
import { useVerifyOtp } from '../_hooks/react-query/useVerifyOtp';
import { useAlertModal } from 'src/hooks/useModal';

interface UserInformationFormProps {
  register: UseFormRegister<SignupSchema>;
  errors: FieldErrors<SignupSchema>;
  watch: UseFormWatch<SignupSchema>;
}

export default function UserInformationForm({ register, errors, watch }: UserInformationFormProps) {
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 인증번호 전송 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [otp, setOtp] = useState(''); // 이메일 인증번호
  const { onCheckAccountId, isUserIdAvailable, validationError } = useAccountIdValidation();
  const { openAlertModal } = useAlertModal();
  const { mutateAsync: sendOtp } = useSendOtp();
  const { mutateAsync: verifyOtp } = useVerifyOtp();

  const id = watch('id');
  const email = watch('email');

  const onSendOtp = async () => {
    if (!email)
      return openAlertModal({
        content: '이메일을 입력해주세요',
      });

    sendOtp(email, { onSuccess: () => setIsEmailSent(true) });
  };

  const onVerifyOtp = async () => {
    if (!otp)
      return openAlertModal({
        content: '인증번호를 입력해주세요.',
      });

    verifyOtp({ email, otp }, { onSuccess: () => setIsEmailVerified(true) });
  };

  return (
    <section>
      <div className='flex flex-col gap-8'>
        {/* 아이디 */}
        <label className='flex flex-col gap-2 w-full'>
          <span className='text-body-18b text-ui-text-title'>아이디</span>
          <p className='text-body-12m text-ui-text-description'>4자~12자리의 영문자, 숫자 / @,#$ 등 특수문자는 제외</p>

          <div className='flex items-center gap-1 w-full'>
            <TextInput {...register('id')} autoComplete='username' placeholder='아이디' />
            <Button type='button' height={48} className='w-fit' onClick={() => onCheckAccountId(id)}>
              중복확인
            </Button>
          </div>

          <div className='relative w-full'>
            {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
            {isUserIdAvailable === true && <p className="text-body-12m before:content-['•'] before:mr-1 before:inline-block text-green-500">사용 가능한 아이디입니다.</p>}
            {isUserIdAvailable === false && <p className="text-body-12m before:content-['•'] before:mr-1 before:inline-block text-red-500">이미 사용 중인 아이디입니다.</p>}
          </div>
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
              <Button type='button' height={48} onClick={onSendOtp} disabled={isEmailSent} className='w-fit'>
                {isEmailSent ? '인증번호 전송됨' : '인증번호 요청'}
              </Button>
            </div>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </label>

          {isEmailSent && (
            <label className='flex justify-end items-center gap-1 w-full'>
              <TextInput type='text' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='6자리 인증번호 입력' disabled={isEmailVerified} className='w-[200px]' />
              <Button type='button' height={48} onClick={onVerifyOtp} disabled={isEmailVerified} className='w-fit'>
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
