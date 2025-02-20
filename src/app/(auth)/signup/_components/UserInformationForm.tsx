import React from 'react';
import TextInput from 'src/components/TextInput/TextInput';
import SignupPasswordInput from './SignupPasswordInput';
import Button from 'src/components/Button/Button';
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';

// todo: 이미 가입한 회원 모달로 알림

export default function UserInformationForm() {
  return (
    <section>
      <div className='flex flex-col gap-[40px]'>
        <label className='flex flex-col gap-2'>
          <span className='text-body-18b text-ui-text-title'>아이디</span>
          <p className='text-body-12m text-ui-text-description'>4자~12자리의 영문자, 숫자 / @,#$등 특수문자는 제외</p>

          <TextInput placeholder='아이디' />
        </label>

        <fieldset className='flex flex-col gap-2'>
          <legend className='text-body-18b text-ui-text-title'>비밀번호</legend>

          <p className='text-body-12m text-ui-text-description'>8자~20자 이내의 영문자, 숫자, 특수문자 조합</p>

          <SignupPasswordInput />
          <div>
            <TextInput type='password' placeholder='비밀번호확인' />
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          </div>
        </fieldset>

        <label className='flex flex-col gap-2'>
          <span className='text-body-18b text-ui-text-title'>닉네임</span>
          <p className='text-body-12m text-ui-text-description'>2자~16자 이내의 한글, 영문, 숫자 조합 가능</p>
          <TextInput type='text' placeholder='닉네임' />
        </label>

        <label className='flex flex-col gap-2'>
          <span className='text-body-18b text-ui-text-title'>이메일</span>

          <div>
            <div className='flex justify-center items-center gap-1 mt-2'>
              <TextInput type='email' placeholder='이메일' />

              <Button type='button' height={48} className='w-fit'>
                인증요청
              </Button>
            </div>

            <ErrorMessage>유효한 이메일 주소가 아닙니다.</ErrorMessage>
          </div>
        </label>
      </div>

      {/* todo: 모든 입력과 이메일 인증 완료시까지 disabled */}
      <Button height={48} className='mt-[60px]'>
        회원가입하기
      </Button>
    </section>
  );
}
