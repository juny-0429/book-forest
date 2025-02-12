import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

interface LineButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof lineButtonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const lineButtonVariants = cva('flex justify-center items-center border disabled:opacity-30 disabled:cursor-not-allowed', {
  variants: {
    height: {
      32: 'h-[32px] gap-[2px] px-3 rounded-[4px] text-body-12r',
      40: 'h-[40px] gap-[4px] px-4 rounded-[4px] text-body-14r',
      48: 'h-[48px] gap-[6px] px-4 rounded-[6px] text-body-16r',
      56: 'h-[56px] gap-[8px] px-5 rounded-[8px] text-body-18r',
    },
    color: {
      gray: 'border-gray-500 text-ui-gray enabled:hover:bg-gray-200',
      cta: 'border-ui-cta text-ui-cta enabled:hover:bg-green-50',
    },
  },
  defaultVariants: {
    color: 'cta',
  },
});

export default function LineButton({ height = 32, color, leftIcon, rightIcon, children, className, ...restProps }: LineButtonProps) {
  return (
    <button type='button' className={cn(lineButtonVariants({ height, color }), className)} {...restProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
