'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import TermsAgreement from './_components/TermsAgreement';
import UserInformationForm from './_components/UserInformationForm';
import SnsLoginButtons from './_components/SnsLoginButtons';

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
      </Link>

      {step === 1 && (
        <div className='flex flex-col items-center gap-[46px]'>
          <h1 className='text-title-24b text-ui-text-title'>회원가입</h1>

          <SnsLoginButtons />
          <TermsAgreement />
        </div>
      )}

      {step === 2 && <UserInformationForm />}

      <p className='fixed bottom-5 text-caption-12b text-ui-text-caption'>© Book Forest, All Rights Reserved.</p>
    </div>
  );
}
