'use client';

import { useState } from 'react';
import TextInput, { TextInputProps } from '@/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';
import { Progress } from 'src/components/Progress/Progress';
import { cn } from 'src/lib/utils';
import { usePasswordStrength } from '../_hooks/usePasswordStrength';
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import { SignupSchema } from '../_schemas/signup.schema';

interface SignupPasswordInputProps {
  register: UseFormRegister<SignupSchema>;
  confirmRegister?: UseFormRegisterReturn;
  errors?: FieldErrors;
}

export default function SignupPasswordInput({ register, errors }: SignupPasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const { rules, progressValue, strength } = usePasswordStrength(password);

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmError(null);
    }
  };

  return (
    <fieldset className='flex flex-col gap-2'>
      <legend className='text-body-18b text-ui-text-title'>비밀번호</legend>
      <p className='text-body-12m text-ui-text-description'>8자~20자 이내의 영문자, 숫자, 특수문자 조합</p>

      <div className='w-full space-y-3'>
        <TextInput
          type={isVisible ? 'text' : 'password'}
          value={password}
          {...register('password')}
          autoComplete='new-password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={
            <button type='button' onClick={() => setIsVisible((prev) => !prev)}>
              {isVisible ? <LucideIcons.Eye /> : <LucideIcons.EyeOff />}
            </button>
          }
          placeholder='비밀번호를 입력해주세요.'
        />

        <div className='flex justify-between items-center gap-20'>
          <Progress value={progressValue} className={strength.progressColor} />
          <span className={cn('text-body-14r whitespace-pre', strength.color)}>{strength.label}</span>
        </div>

        {/* 유효성 검사 체크 리스트 */}
        <div className='space-y-1'>
          {rules.map(({ rule, passed }, index) => (
            <div key={index} className={cn('flex items-center gap-2 text-body-12r', passed ? 'text-state-success' : 'text-state-error')}>
              {passed ? <LucideIcons.CheckCircle size={16} /> : <LucideIcons.XCircle size={16} />}
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </div>

      <TextInput
        type={isConfirmVisible ? 'text' : 'password'}
        value={confirmPassword}
        {...register('confirmPassword')}
        autoComplete='new-password'
        name='confirmPassword'
        onChange={onConfirmPasswordChange}
        rightIcon={
          <button type='button' onClick={() => setIsConfirmVisible((prev) => !prev)}>
            {isConfirmVisible ? <LucideIcons.Eye /> : <LucideIcons.EyeOff />}
          </button>
        }
        placeholder='비밀번호 확인'
      />

      {confirmError && <p className='text-red-500 text-sm'>{confirmError}</p>}
    </fieldset>
  );
}
