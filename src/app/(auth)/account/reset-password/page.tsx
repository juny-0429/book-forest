'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import LucideIcons from 'src/theme/lucideIcon';
import Button from 'src/components/Button/Button';
import SignupPasswordInput from '../../signup/_components/SignupPasswordInput';
import { useResetPassword } from './_hooks/react-query/useResetPassword';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema, ResetPasswordSchema } from './_schemas/resetPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAlertModal } from 'src/hooks/useModal';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { mutate: resetPassword } = useResetPassword();
  const { openAlertModal } = useAlertModal();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  const onSubmit = ({ password }: ResetPasswordSchema) => {
    resetPassword(password, {
      onSuccess: async () => {
        await supabaseBrowser.auth.signOut();

        openAlertModal({
          title: '비밀번호 변경 완료',
          content: '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.',
          onConfirm: () => router.push(appRoutes.login),
        });
      },
      onError: (error) => {
        alert((error as Error).message);
      },
    });
  };

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
      </Link>

      <div className='flex flex-col items-center gap-[46px] w-[400px]'>
        <h1 className='text-title-24b text-ui-text-title'>새로운 비밀번호를 설정해주세요.</h1>

        <div className='flex flex-col items-center gap-[40px]'>
          <LucideIcons.User size={100} strokeWidth={1} className='p-4 text-white bg-ui-main rounded-full shadow-blur-6-50' />

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
            <SignupPasswordInput register={register} errors={errors} watchPassword={password} trigger={trigger} />

            <Button type='submit' height={48} className='mt-10'>
              비밀번호 변경
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
