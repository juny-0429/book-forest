'use client';

import React from 'react';
import Button from 'src/components/Button/Button';
import CapsuleButton from 'src/components/Button/CapsuleButton';
import LineButton from 'src/components/Button/LineButton';
import Tooltip from 'src/components/Tooltip/Tooltip';
import { useCustomModal } from 'src/hooks/useModal';
import LucideIcons from 'src/theme/lucideIcon';
import ResetPasswordModalContent from './_components/ResetPasswordModalContent';

export default function ProfilePage() {
  const { openCustomModal } = useCustomModal();

  const showResetPasswordModal = () => {
    openCustomModal({
      children: <ResetPasswordModalContent />,
    });
  };

  return (
    <div className='flex flex-col w-full gap-[50px]'>
      <h2 className='text-title-24b text-ui-text-title'>회원정보 수정</h2>

      <div>
        <section className='py-[30px] border-b border-solid border-gray-300'>
          <ul className='flex flex-col gap-[10px]'>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>아이디</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>juny_0429</p>
            </li>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>비밀번호</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'></p>
              <LineButton height={40} className='w-fit' onClick={showResetPasswordModal}>
                변경
              </LineButton>
            </li>
            <li className='flex items-center'>
              <div className='flex items-center gap-1 w-[230px]'>
                <p className='text-body-18m text-ui-text-title'>이름</p>
                <Tooltip position='right' content='개명한 회원은 본인 인증 후, 변경하실 수 있습니다.개명한 회원은 본인 인증 후, 변경하실 수 있습니다.'>
                  <LucideIcons.InfoIcon size={16} className='text-gray-600' />
                </Tooltip>
              </div>
              <p className='w-[300px] text-body-16r text-ui-text-title'>박*영</p>
              <LineButton height={40} className='w-fit'>
                변경
              </LineButton>
            </li>
          </ul>
        </section>

        <section className='py-[30px] border-b border-solid border-gray-300'>
          <ul className='flex flex-col gap-[10px]'>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>생년월일</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>1993-12-12</p>
            </li>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>이메일</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>support@bookforest.com</p>
              <LineButton height={40} className='w-fit'>
                변경
              </LineButton>
            </li>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>휴대전화</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>010-1111-2222</p>
              <LineButton height={40} className='w-fit'>
                변경
              </LineButton>
            </li>
          </ul>
        </section>

        <section className='py-[30px] border-b border-solid border-gray-300'>
          <ul className='flex flex-col gap-[10px]'>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>구글 연동</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>연동 완료</p>
            </li>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>네이버 연동</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>연동전</p>
              <CapsuleButton height={40} className='w-fit'>
                연동
              </CapsuleButton>
            </li>
            <li className='flex items-center'>
              <p className='w-[230px] text-body-18m text-ui-text-title'>카카오 연동</p>
              <p className='w-[300px] text-body-16r text-ui-text-title'>연동전</p>
              <CapsuleButton height={40} className='w-fit'>
                연동
              </CapsuleButton>
            </li>
          </ul>
        </section>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <Button height={48} className='w-[150px]'>
          확인
        </Button>
        <LineButton height={48} className='w-[150px]'>
          취소
        </LineButton>
      </div>
    </div>
  );
}
