'use client';

import React from 'react';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { accountDeleteWarnings } from './_data/accountDeleteInfo';
import { accountDeleteReasons } from './_data/accountDeleteReasons';
import Radio from 'src/components/Radio/Radio';
import Button from 'src/components/Button/Button';
import { useAlertModal } from 'src/hooks/useModal';

export default function AccountDeletePage() {
  const { openAlertModal } = useAlertModal();

  const onAccountDeleteClick = () => {
    openAlertModal({
      content: '정말로 탈퇴하시겠습니까?',
    });
  };

  return (
    <div className='flex flex-col w-full gap-[60px]'>
      <h2 className='text-title-24b text-ui-text-title'>회원탈퇴</h2>

      <p className='text-body-18m text-ui-text-body'>책숲을 이용해 주신 데 깊은 감사를 드리며, 탈퇴 시 유의사항을 안내드리오니 반드시 확인 부탁드립니다.</p>

      <div>
        <section className='space-y-5 py-10 border-b border-solid border-gray-300'>
          <h3 className='text-body-18b text-state-error'>회원 탈퇴 시 유의 사항</h3>

          <ul className='list-disc list-inside'>
            {accountDeleteWarnings.map((warning, index) => (
              <li key={index} className='text-body-16r text-ui-text-description'>
                {warning}
              </li>
            ))}
          </ul>
        </section>

        <section className='space-y-5 py-10 border-b border-solid border-gray-300'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-body-18m text-ui-text-title'>이용에 불편함이 있으셨나요?</h3>
            <p className='text-body-16r text-ui-text-body'>책숲을 떠나시는 이유를 말씀해 주시면 더 나은 서비스로 개선하겠습니다.</p>
          </div>

          <ul className='flex flex-col gap-3 pl-4'>
            {accountDeleteReasons.map((reason, index) => (
              <li>
                <Radio>{reason}</Radio>
              </li>
            ))}
          </ul>
        </section>

        <section className='space-y-5 py-10 border-b border-solid border-gray-300'>
          <h3 className='text-body-18m text-ui-text-title'>책숲과의 여정을 마무리 하시기 전, 회원님의 의견을 들려주시면 소중히 반영하겠습니다.</h3>

          <form>
            <textarea placeholder='이곳에 의견을 작성해주세요.' className='w-[600px] p-5 outline-none bg-transparent border border-solid border-gray-600 rounded-[8px]' />
          </form>
        </section>

        {/* todo: 데이터베이스에 체크 항목 컬럼 추가 */}
        <div className='space-y-5 py-10'>
          <CheckBox>
            <span className='text-state-error font-semibold'>안내사항을 모두 확인했으며, 탈퇴 시 회원 정보는 모두 삭제되고 데이터 복구가 불가함에 동의합니다.</span>
          </CheckBox>

          <Button height={48} onClick={onAccountDeleteClick} className='w-[150px] bg-state-error'>
            회원 탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
