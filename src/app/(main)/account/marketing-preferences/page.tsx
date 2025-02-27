'use client';

import React, { useState } from 'react';
import { agreementRewards } from './_data/agreementRewards.data';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';

export default function MarketingPreferencesPage() {
  const [isMarketingChecked, setIsMarketingChecked] = useState(false); // 책숲 마케팅 수신 동의 전체 체크 여부
  const [isSmsChecked, setIsSmsChecked] = useState(false); // 문자/카카오톡 체크 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 체크 여부

  const handleSubCheckboxChange = (type: 'sms' | 'email') => {
    if (type === 'sms') {
      setIsSmsChecked((prev) => !prev);
    } else {
      setIsEmailChecked((prev) => !prev);
    }
  };

  const handleMarketingCheckboxChange = () => {
    const newValue = !isMarketingChecked;
    setIsMarketingChecked(newValue);
    setIsSmsChecked(newValue);
    setIsEmailChecked(newValue);
  };

  React.useEffect(() => {
    if (isSmsChecked || isEmailChecked) {
      setIsMarketingChecked(true);
    } else {
      setIsMarketingChecked(false);
    }
  }, [isSmsChecked, isEmailChecked]);

  return (
    <div className='flex flex-col w-full gap-[70px]'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-title-24b text-ui-text-title'>마케팅 수신 설정</h2>
        <small className='text-body-14r text-ui-text-description'>맞춤형 정보와 혜택을 제공해드리기 위해 마케팅 정보 수신 여부를 설정하실 수 있습니다.</small>
      </div>

      <section className='flex flex-col gap-3'>
        <h3 className='text-body-18m'>수신 동의 시 제공 혜택</h3>
        <ul className='flex flex-col gap-1 list-disc list-inside'>
          {agreementRewards.map((reward, index) => (
            <li key={index} className='text-body-14r text-ui-text-description'>
              {reward}
            </li>
          ))}
        </ul>
      </section>

      <section className='flex justify-between items-center px-[50px] py-5 border-t border-b border-solid border-gray-300'>
        <CheckBox checked={isMarketingChecked} onChange={handleMarketingCheckboxChange}>
          책숲 마케팅 수신 동의 (선택)
        </CheckBox>

        <div className='flex justify-center items-center gap-5'>
          <CheckBox checked={isSmsChecked} onChange={() => handleSubCheckboxChange('sms')}>
            문자/카카오톡
          </CheckBox>
          <CheckBox checked={isEmailChecked} onChange={() => handleSubCheckboxChange('email')}>
            이메일
          </CheckBox>
        </div>
      </section>

      <div className='flex justify-center items-center gap-1'>
        <Button height={48} className='w-[150px]'>
          저장
        </Button>
        <LineButton height={48} className='w-[150px]'>
          취소
        </LineButton>
      </div>
    </div>
  );
}
