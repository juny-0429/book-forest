import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import { appRoutes } from 'src/routes/appRoutes';
import LoginMenu from './_components/LoginMenu';
import SnsLoginButtons from './_components/SnsLoginButtons';
import LoginForm from './_components/LoginForm';

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-10 w-full h-screen'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={160} alt='logo image' />
      </Link>

      <LoginForm />
      <LoginMenu />
      <SnsLoginButtons />
    </div>
  );
}
