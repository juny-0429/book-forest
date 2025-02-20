'use client';

import Link from 'next/link';
import React from 'react';
import Button from 'src/components/Button/Button';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { appRoutes } from 'src/routes/appRoutes';
import LucideIcons from 'src/theme/lucideIcon';

export default function TermsAgreement() {
  return (
    <section>
      <h2 className='text-title-16b text-ui-text-title'>약관 동의</h2>

      <div className='flex flex-col gap-[46px] mt-5'>
        <div className='flex flex-col items-center gap-4 p-[25px] w-[400px] border border-solid border-gray-300 rounded-[5px]'>
          <div className='flex flex-col items-start gap-1 w-full'>
            <CheckBox>전체동의</CheckBox>
            <p className='text-caption-12r text-ui-text-description'>아래 모든 약관 및 마케팅 안내 수신 내용을 확인 및 동의합니다.</p>
          </div>

          <hr className='w-full h-[1px] bg-gray-300' />

          <div className='flex flex-col gap-4 w-full'>
            <CheckBox>
              만 14세 이상입니다.<span className='ml-2 text-caption-12r text-ui-cta'>(필수)</span>
            </CheckBox>
            <div className='flex justify-between items-center'>
              <CheckBox>
                이용약관<span className='ml-2 text-caption-12r text-ui-cta'>(필수)</span>
              </CheckBox>
              <Link href='#'>
                <LucideIcons.ChevronRight />
              </Link>
            </div>
            <div className='flex justify-between items-center'>
              <CheckBox>
                개인정보수집 및 이용동의<span className='ml-2 text-caption-12r text-ui-cta'>(필수)</span>
              </CheckBox>
              <Link href='#'>
                <LucideIcons.ChevronRight />
              </Link>
            </div>
            <div className='flex justify-between items-center'>
              <CheckBox>
                개인정보 마케팅 활용 동의<span className='ml-2 text-caption-12r text-ui-text-description'>(선택)</span>
              </CheckBox>
              <Link href='#'>
                <LucideIcons.ChevronRight />
              </Link>
            </div>

            <CheckBox>
              이벤트 및 특가 알림 수신 동의<span className='ml-2 text-caption-12r text-ui-text-description'>(선택)</span>
            </CheckBox>
          </div>
        </div>

        <Button height={48}>다음</Button>

        <div className='flex justify-center items-center gap-3'>
          <span className='text-body-16r text-ui-text-description'>이미 아이디가 있으신가요?</span>

          <Link href={appRoutes.login}>
            <span className='text-body-16b text-ui-text-title underline'>로그인</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
