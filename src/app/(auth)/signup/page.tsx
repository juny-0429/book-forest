'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TermsAgreement from './_components/TermsAgreement/TermsAgreement';
import UserInformationForm from './_components/UserInformationForm';
import { signupSchema, SignupSchema } from './_schemas/signup.schema';
import { useSignup } from './_hooks/react-query/useSignup';
import SignupHero from './_components/SignupHero';

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  const { mutateAsync: signupAsync } = useSignup();

  const onSubmit = async (data: SignupSchema) => {
    await signupAsync(data);
  };

  return (
    <div className='flex justify-center items-center w-full py-[130px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignupHero />
        {step === 1 && <TermsAgreement setStep={setStep} register={register} watch={watch} setValue={setValue} errors={errors} />}
        {step === 2 && <UserInformationForm register={register} errors={errors} watch={watch} />}
      </form>
    </div>
  );
}
