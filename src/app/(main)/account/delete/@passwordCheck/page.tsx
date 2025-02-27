'use client';

import { useState } from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

export default function PasswordCheckPage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='flex flex-col w-full gap-[70px]'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-title-24b text-ui-text-title'>비밀번호 재확인</h2>
        <small className='text-body-14m text-ui-text-description'>사용자 인증을 위해 비밀번호를 다시 입력해주세요.</small>
      </div>

      <form className='flex items-center w-full p-[30px] border-t border-b border-solid border-gray-300'>
        <label className='flex items-center gap-[100px]'>
          <span className='text-body-16b text-ui-text-title whitespace-nowrap'>비밀번호</span>
          <TextInput
            type={isVisible ? 'text' : 'password'}
            placeholder='비밀번호를 입력해주세요.'
            rightIcon={
              <button type='button' onClick={() => setIsVisible((prev) => !prev)}>
                {isVisible ? <LucideIcons.Eye /> : <LucideIcons.EyeOff />}
              </button>
            }
          />
        </label>
      </form>

      <div className='flex justify-center items-center w-full'>
        <Button height={48} className='w-[150px]'>
          확인
        </Button>
      </div>
    </div>
  );
}
