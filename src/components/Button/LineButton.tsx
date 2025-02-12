'use client';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { ButtonProps, disabledStyles, heightStyle } from './BaseButton';
import { ColorType } from 'src/types/color.types';

const colorStyles: Partial<Record<ColorType, string>> = {
  gray: 'border-gray-500 text-ui-gray enabled:hover:bg-gray-200',
  cta: 'border-ui-cta text-ui-cta enabled:hover:bg-green-50',
};

export default function LineButton({ height, color, leftIcon, rightIcon, children, className, ...restProps }: ButtonProps) {
  const buttonClass = useMemo(() => {
    return clsx('flex justify-center items-center border', heightStyle[height], colorStyles[color], disabledStyles, className);
  }, [height, color, className]);

  return (
    <button type='button' {...restProps} className={buttonClass}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
