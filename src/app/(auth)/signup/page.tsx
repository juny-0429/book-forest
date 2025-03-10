'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import TermsAgreement from './_components/TermsAgreement/TermsAgreement';
import UserInformationForm from './_components/UserInformationForm';
import { signupSchema, SignupSchema } from './_schemas/signup.schema';
import { useSignup } from './_hooks/react-query/useSignup';

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  const { mutateAsync, isError, error } = useSignup();

  const onSubmit = async (data: SignupSchema) => {
    try {
      const result = await mutateAsync(data);
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <div className='flex justify-center items-center w-full py-[130px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Link href={appRoutes.home}>
          <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
        </Link>

        {step === 1 && <TermsAgreement setStep={setStep} register={register} watch={watch} setValue={setValue} errors={errors} />}
        {step === 2 && <UserInformationForm register={register} errors={errors} watch={watch} />}
      </form>
    </div>
  );
}
