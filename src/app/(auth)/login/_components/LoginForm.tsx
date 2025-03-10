'use client';

import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

export default function LoginForm() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <form className='flex flex-col items-center w-[350px]'>
      <TextInput type='text' placeholder='아이디를 입력하세요' />
      <TextInput
        type={isPasswordShow ? 'text' : 'password'}
        placeholder='비밀번호를 입력하세요'
        rightIcon={
          <button type='button' onClick={() => setIsPasswordShow((prev) => !prev)}>
            {isPasswordShow ? <LucideIcons.Eye /> : <LucideIcons.EyeOff />}
          </button>
        }
        className='mt-[10px]'
      />

      <Button height={48} type='submit' className='w-full mt-10'>
        로그인
      </Button>
    </form>
  );
}
