'use client';
import { useState } from 'react';
import CheckBox from 'src/components/CheckBox/CheckBox';

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <CheckBox checked={isChecked} onChange={() => setIsChecked(!isChecked)}>
        테스트 체크박스 입니다
      </CheckBox>
      <p className='mt-2'>선택됨: {isChecked ? '✅' : '❌'}</p>
    </div>
  );
}
