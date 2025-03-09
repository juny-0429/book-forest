'use client';

import React from 'react';
import Link from 'next/link';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Button from 'src/components/Button/Button';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { appRoutes } from 'src/routes/appRoutes';
import { SignupSchema } from '../../_schemas/signup.schema';
import SnsLoginButtons from '../SnsLoginButtons';
import AgreementCheckBox from './AgreementCheckBox';

interface TermsAgreementProps {
  setStep: (step: number) => void;
  register: UseFormRegister<SignupSchema>;
  watch: UseFormWatch<SignupSchema>;
  setValue: UseFormSetValue<SignupSchema>;
  errors: FieldErrors<SignupSchema>;
}

export default function TermsAgreement({ setStep, register, watch, setValue, errors }: TermsAgreementProps) {
  const agreeAgeChecked = watch('agreeAge') ?? false;
  const agreeTermsChecked = watch('agreeTerms') ?? false;
  const agreePrivacyChecked = watch('agreePrivacy') ?? false;
  const agreeMarketingChecked = watch('agreeMarketing') ?? false;
  const agreeEventChecked = watch('agreeEvent') ?? false;

  const allRequiredChecked = agreeAgeChecked && agreeTermsChecked && agreePrivacyChecked;

  const handleCheckAll = () => {
    const newState = !allRequiredChecked;
    setValue('agreeAge', newState);
    setValue('agreeTerms', newState);
    setValue('agreePrivacy', newState);
    setValue('agreeMarketing', newState);
    setValue('agreeEvent', newState);
  };

  return (
    <section className='flex flex-col items-center gap-[46px]'>
      <h1 className='text-title-24b text-ui-text-title'>회원가입</h1>
      <SnsLoginButtons />

      <div>
        <h2 className='text-title-16b text-ui-text-title'>약관 동의</h2>

        <div className='flex flex-col gap-[46px] mt-5'>
          <div className='flex flex-col items-center gap-4 p-[25px] w-[400px] border border-solid border-gray-300 rounded-[5px]'>
            {/* 전체동의 체크박스 */}
            <div className='flex flex-col items-start gap-1 w-full'>
              <CheckBox checked={allRequiredChecked} onChange={handleCheckAll}>
                전체동의
              </CheckBox>
              <p className='text-caption-12r text-ui-text-description'>아래 모든 약관 및 마케팅 안내 수신 내용을 확인 및 동의합니다.</p>
            </div>

            <hr className='w-full h-[1px] bg-gray-300' />

            {/* 필수 동의 항목 */}
            <AgreementCheckBox label='만 14세 이상입니다.' required checked={agreeAgeChecked} register={register('agreeAge')} />
            <AgreementCheckBox label='이용약관' required checked={agreeTermsChecked} register={register('agreeTerms')} link={appRoutes.policies.termsOfService} />
            <AgreementCheckBox label='개인정보수집 및 이용동의' required checked={agreePrivacyChecked} register={register('agreePrivacy')} link={appRoutes.policies.privacyPolicy} />

            {/* 선택 동의 항목 */}
            <AgreementCheckBox label='개인정보 마케팅 활용 동의' checked={agreeMarketingChecked} register={register('agreeMarketing')} link={appRoutes.policies.marketingConsent} />
            <AgreementCheckBox label='이벤트 및 특가 알림 수신 동의' checked={agreeEventChecked} register={register('agreeEvent')} />
          </div>

          <Button type='button' height={48} onClick={() => setStep(2)} disabled={!allRequiredChecked}>
            다음
          </Button>

          <div className='flex justify-center items-center gap-3'>
            <span className='text-body-16r text-ui-text-description'>이미 아이디가 있으신가요?</span>
            <Link href={appRoutes.login}>
              <span className='text-body-16b text-ui-text-title underline'>로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
