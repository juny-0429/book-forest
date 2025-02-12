'use client';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { ButtonHeight, disabledStyles, heightStyle } from './BaseButton';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  height: ButtonHeight;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function TextButton({ height, leftIcon, rightIcon, children, className, ...restProps }: ButtonProps) {
  const buttonClass = useMemo(() => {
    return clsx('flex justify-center items-center text-ui-text-title enabled:hover:text-ui-cta', heightStyle[height], disabledStyles, className);
  }, [height, className]);
  return (
    <button type='button' {...restProps} className={buttonClass}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
