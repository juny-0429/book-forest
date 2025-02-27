'use client';

import { forwardRef, useState } from 'react';
import TextInput, { TextInputProps } from '@/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';
import { Progress } from 'src/components/Progress/Progress';
import { cn } from 'src/lib/utils';
import { usePasswordStrength } from '../_hooks/usePasswordStrength';

interface SignupPasswordInputProps extends Omit<TextInputProps, 'type' | 'rightIcon'> {
  userId?: string;
  register?: any;
  isDirty?: boolean;
}

const SignupPasswordInput = forwardRef<HTMLInputElement, SignupPasswordInputProps>(({ className, userId, register, isDirty, ...restProps }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const password = String(restProps.value || '');

  const { rules, progressValue, strength } = usePasswordStrength(password, userId);

  return (
    <div className='w-full space-y-3'>
      <TextInput
        type={isVisible ? 'text' : 'password'}
        ref={ref}
        // {...register('password')}
        {...restProps}
        className={className}
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

      {/* 유효성 검사 리스트 */}
      <div className='space-y-1'>
        {rules.map(({ rule, passed }, index) => (
          <div key={index} className={cn('flex items-center gap-2 text-body-12r', passed ? 'text-state-success' : 'text-state-error')}>
            {passed ? <LucideIcons.CheckCircle size={16} /> : <LucideIcons.XCircle size={16} />}
            <p>{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

SignupPasswordInput.displayName = 'SignupPasswordInput';

export default SignupPasswordInput;
