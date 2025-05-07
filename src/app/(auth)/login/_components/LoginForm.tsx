'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';
import { loginSchema, LoginSchema } from '../_schemas/login.schema';
import { useLogin } from '../_hooks/react-query/useLogin';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';

export default function LoginForm() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: loginAsync, isError, error } = useLogin();

  const onSubmit = async (data: LoginSchema) => {
    await loginAsync({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-[350px]' noValidate>
      <TextInput type='email' {...register('email')} autoComplete='username' placeholder='이메일을 입력하세요' />
      <TextInput
        type={isPasswordShow ? 'text' : 'password'}
        {...register('password')}
        placeholder='비밀번호를 입력하세요'
        autoComplete='current-password'
        rightIcon={
          <button type='button' onClick={() => setIsPasswordShow((prev) => !prev)}>
            {isPasswordShow ? <LucideIcons.Eye /> : <LucideIcons.EyeOff />}
          </button>
        }
        className='mt-[10px]'
      />
      <div className='relative w-full'>
        {errors.email && errors.password ? (
          <ErrorMessage>이메일과 비밀번호 모두 입력해주세요</ErrorMessage>
        ) : (
          <>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            {errors.password && <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>}
          </>
        )}
        {isError && error instanceof Error && <ErrorMessage>일치하지 않는 정보가 있습니다.</ErrorMessage>}
      </div>

      <Button height={48} type='submit' className='w-full mt-10'>
        로그인
      </Button>
    </form>
  );
}
