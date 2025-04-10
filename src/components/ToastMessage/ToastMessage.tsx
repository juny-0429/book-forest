'use client';

import React from 'react';
import { useToastStore } from 'src/store/useToastStore';
import { cn } from 'src/lib/utils';
import Image from 'next/image';

import SuccessIcon from '@/assets/icons/Success.png';
import InformativeIcon from '@/assets/icons/Informative.png';
import errorIcon from '@/assets/icons/error.png';
import WarningIcon from '@/assets/icons/Warning.png';

const toastIcons = {
  success: <Image src={SuccessIcon} alt='Success Icon' width={24} height={24} />,
  informative: <Image src={InformativeIcon} alt='Informative Icon' width={24} height={24} />,
  error: <Image src={errorIcon} alt='Error Icon' width={24} height={24} />,
  warning: <Image src={WarningIcon} alt='Warning Icon' width={24} height={24} />,
};

const toastVariants = {
  default: 'border-gray-600 bg-white',
  success: 'border-2 border-state-success bg-white',
  informative: 'border-2 border-state-informative bg-white',
  error: 'border-2 border-state-error bg-white',
  warning: 'border-2 border-state-warning bg-white',
};

export default function ToastMessage() {
  const { toasts } = useToastStore();

  return (
    <div className='fixed bottom-4 right-4 flex flex-col gap-2 z-50'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex justify-start items-center gap-4 w-[400px] p-5 rounded-[8px] border border-solid shadow-blur-4-25',
            toast.isVisible ? 'animate-slide-top' : 'animate-slide-right opacity-0',
            toastVariants[toast.type]
          )}
        >
          <div>{toast.type === 'default' ? toast.icon : toastIcons[toast.type]}</div>

          <div className='flex flex-col items-start gap-2'>
            <strong className='text-title-16b text-ui-text-title'>{toast.title}</strong>
            <p className='text-body-16r text-ui-text-body'>{toast.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
