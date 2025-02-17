import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';
import LucideIcons from 'src/theme/lucideIcon';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDirty?: boolean;
  isError?: boolean;
  errorMessage?: string;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
}

const inputVariants = cva('flex items-center w-full h-[48px] px-4 gap-2 rounded-[8px] text-body-16m text-ui-text-title placeholder-ui-text-description bg-white border border-solid border-gray-600', {
  variants: {
    isDirty: {
      true: 'border-2 border-state-success',
    },
    isError: {
      true: 'border-2 border-state-error text-state-error',
    },
    disabled: {
      true: 'bg-gray-300 cursor-not-allowed',
    },
  },
  defaultVariants: {
    isDirty: false,
    isError: false,
    disabled: false,
  },
});

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ isDirty, isError, rightIcon, className, onClear, disabled, ...restProps }, ref) => {
  return (
    <div className={cn(inputVariants({ isError, isDirty, disabled }), className)}>
      <input ref={ref} {...restProps} className={cn('w-full outline-none bg-transparent', disabled && 'cursor-not-allowed pointer-events-none')} />
      {isDirty && !disabled && (
        <button type='button' onClick={onClear}>
          <LucideIcons.X size={16} className='text-gray-900' />
        </button>
      )}
      {rightIcon}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
