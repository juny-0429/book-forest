import React from 'react';
import LoginMenu from './_components/LoginMenu';
import SnsLoginButtons from './_components/SnsLoginButtons';
import LoginForm from './_components/LoginForm';
import LoginHero from './_components/LoginHero';

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-10 w-full h-screen'>
      <LoginHero />
      <LoginForm />
      <LoginMenu />
      <SnsLoginButtons />
    </div>
  );
}
