'use client';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

export type ButtonHeight = 32 | 40 | 48 | 56;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, // color 제거
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonVariants = cva('flex justify-center items-center text-white disabled:opacity-30 disabled:cursor-not-allowed', {
  variants: {
    height: {
      32: 'h-[32px] gap-[2px] px-3 rounded-[4px] text-body-12r',
      40: 'h-[40px] gap-[4px] px-4 rounded-[4px] text-body-14r',
      48: 'h-[48px] gap-[6px] px-4 rounded-[6px] text-body-16r',
      56: 'h-[56px] gap-[8px] px-5 rounded-[8px] text-body-18r',
    },
    color: {
      gray: 'bg-gray-500 enabled:hover:bg-gray-600',
      cta: 'bg-ui-cta enabled:hover:bg-ui-cta-hover',
    },
  },
  defaultVariants: {
    color: 'cta',
  },
});

export default function Button({ height = 32, color, leftIcon, rightIcon, children, className, ...restProps }: ButtonProps) {
  return (
    <button type='button' className={cn(buttonVariants({ height, color }), className)} {...restProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
