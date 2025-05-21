'use client';

import React from 'react';
import { useToastStore } from 'src/store/useToastStore';
import { cn } from 'src/lib/utils';
import Image from 'next/image';

import SuccessIcon from '@/assets/icons/Success.png';
import InformativeIcon from '@/assets/icons/Informative.png';
import errorIcon from '@/assets/icons/Error.png';
import WarningIcon from '@/assets/icons/Warning.png';

const toastIcons = {
  success: <Image src={SuccessIcon} alt='Success Icon' width={24} height={24} />,
  informative: <Image src={InformativeIcon} alt='Informative Icon' width={24} height={24} />,
  error: <Image src={errorIcon} alt='Error Icon' width={24} height={24} />,
  warning: <Image src={WarningIcon} alt='Warning Icon' width={24} height={24} />,
};

const toastVariants = {
  default: 'border-gray-600 bg-white',
  success: 'border-l-4 border-state-success bg-green-50',
  informative: 'border-l-4 border-state-informative bg-blue-50',
  error: 'border-l-4 border-state-error bg-red-50',
  warning: 'border-l-4 border-state-warning bg-saffron-50',
};

export default function ToastMessage() {
  const { toasts } = useToastStore();

  return (
    <div className='fixed bottom-4 right-4 flex flex-col gap-21z-50'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex justify-start gap-4 w-[400px] px-3 py-4 border-solid shadow-blur-4-25',
            toast.isVisible ? 'animate-slide-top' : 'animate-slide-right opacity-0',
            toastVariants[toast.type]
          )}
        >
          <div>{toast.type === 'default' ? toast.icon : toastIcons[toast.type]}</div>

          <div className='flex flex-col items-start gap-1'>
            <strong className='text-title-16b text-ui-text-title'>{toast.title}</strong>
            <p className='text-body-16r text-ui-text-body'>{toast.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
