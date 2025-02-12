'use client';
import clsx from 'clsx';
import React from 'react';
import { disabledStyles } from './BaseButton';

type ButtonHeight = 24 | 32 | 40;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  height: ButtonHeight;
  children: React.ReactNode;
}

const heightStyle: { [k in ButtonHeight]: string } = {
  24: 'size-[24px] rounded-[4px]',
  32: 'size-[32px] rounded-[6px]',
  40: 'size-[40px] rounded-[8px]',
};

export default function IconButton({ height, children, className, ...restProps }: ButtonProps) {
  return (
    <button type='button' {...restProps} className={clsx('flex justify-center items-center border border-gray-300 enabled:hover:bg-gray-300 text-ui-text-title', heightStyle[height], disabledStyles)}>
      {children}
    </button>
  );
}
