import React from 'react';

interface ProductFormItemProps {
  label: string;
  children: React.ReactNode;
}

export default function ProductFormItem({ label, children }: ProductFormItemProps) {
  return (
    <label className='flex items-center gap-1'>
      <span className='w-[100px] flex-shrink-0 text-body-18m text-nowrap'>{label}</span>
      {children}
    </label>
  );
}
