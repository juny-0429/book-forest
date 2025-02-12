'use client';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { ColorType } from 'src/types/color.types';

type ButtonHeight = 32 | 40 | 48 | 56;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  height: ButtonHeight;
  color: ColorType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const heightStyle: { [k in ButtonHeight]: string } = {
  32: 'h-[32px] gap-[2px] px-3 rounded-[4px] text-body-12r',
  40: 'h-[40px] gap-[4px] px-4 rounded-[4px] text-body-14r',
  48: 'h-[48px] gap-[6px] px-4 rounded-[6px] text-body-16r',
  56: 'h-[56px] gap-[8px] px-5 rounded-[8px] text-body-18r',
};

const colorStyles: Partial<Record<ColorType, string>> = {
  gray: 'bg-gray-500 enabled:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed',
  cta: 'bg-ui-cta enabled:hover:bg-ui-cta-hover disabled:opacity-30 disabled:cursor-not-allowed',
};

export default function BaseButton({ height, color, leftIcon, rightIcon, children, className, ...restProps }: ButtonProps) {
  const buttonClass = useMemo(() => {
    return clsx('flex justify-center items-center text-white', heightStyle[height], colorStyles[color], className);
  }, [height, color, className]);

  return (
    <button type='button' {...restProps} className={buttonClass}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
