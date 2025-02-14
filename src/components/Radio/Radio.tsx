import React, { forwardRef } from 'react';
import LucideIcons from 'src/theme/lucideIcon';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ children, disabled, ...restProps }, ref) => {
  return (
    <label className={`flex items-center gap-x-1 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
      <input type='radio' className='hidden' ref={ref} {...restProps} disabled={disabled} />
      {restProps.checked ? (
        <LucideIcons.CircleCheck size={24} className={disabled ? 'text-gray-300' : 'text-gray-900'} />
      ) : (
        <LucideIcons.Circle size={24} className={disabled ? 'text-gray-300' : 'text-gray-400'} />
      )}
      {children && <span className={`text-title-16r ${disabled ? 'text-gray-400' : 'text-ui-text-title'}`}>{children}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';

export default Radio;
