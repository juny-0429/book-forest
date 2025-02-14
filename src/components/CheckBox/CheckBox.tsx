import React, { forwardRef } from 'react';
import LucideIcons from 'src/theme/lucideIcon';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ children, ...restProps }, ref) => {
  return (
    <label className='flex items-center cursor-pointer gap-x-1'>
      <input type='checkbox' className='hidden' ref={ref} {...restProps} />
      {restProps.checked ? <LucideIcons.SquareCheck size={24} className='text-gray-900' /> : <LucideIcons.Square size={24} className='text-gray-400' />}
      {children && <span className='text-title-16r text-ui-text-title'>{children}</span>}
    </label>
  );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
