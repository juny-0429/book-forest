import React, { forwardRef } from 'react';
import LucideIcons from 'src/theme/lucideIcon';
import { cn } from 'src/lib/utils';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ children, disabled, ...restProps }, ref) => {
  return (
    <label className={cn('flex items-center gap-x-1 cursor-pointer', { 'cursor-not-allowed opacity-60': disabled })}>
      <input type='checkbox' className='hidden' ref={ref} {...restProps} disabled={disabled} />
      {restProps.checked ? (
        <LucideIcons.SquareCheck size={24} className={disabled ? 'text-gray-300' : 'text-gray-900'} />
      ) : (
        <LucideIcons.Square size={24} className={disabled ? 'text-gray-300' : 'text-gray-400'} />
      )}
      {children && <span className={`text-title-16r ${disabled ? 'text-gray-400' : 'text-ui-text-title'}`}>{children}</span>}
    </label>
  );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
