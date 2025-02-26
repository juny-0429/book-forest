import React from 'react';
import SignupPasswordInput from 'src/app/(auth)/signup/_components/SignupPasswordInput';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import TextInput from 'src/components/TextInput/TextInput';

export default function ResetPasswordModalContent() {
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-title-24b text-ui-text-title'>비밀번호 변경하기</h2>

      <form className='space-y-5'>
        <SignupPasswordInput />
        <TextInput type='password' placeholder='비밀번호를 다시 입력해주세요.' />
      </form>

      <div className='flex justify-end items-center gap-1 w-full'>
        <LineButton height={40} className='w-fit'>
          취소
        </LineButton>
        <Button height={40} className='w-fit'>
          변경
        </Button>
      </div>
    </div>
  );
}
