import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

interface TextButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof textButtonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const textButtonVariants = cva('flex justify-center items-center text-ui-text-title enabled:hover:text-ui-cta disabled:opacity-30 disabled:cursor-not-allowed', {
  variants: {
    height: {
      32: 'h-[32px] gap-[2px] px-3 rounded-[4px] text-body-12r',
      40: 'h-[40px] gap-[4px] px-4 rounded-[4px] text-body-14r',
      48: 'h-[48px] gap-[6px] px-4 rounded-[6px] text-body-16r',
      56: 'h-[56px] gap-[8px] px-5 rounded-[8px] text-body-18r',
    },
  },
});

export default function TextButton({ height = 32, leftIcon, rightIcon, children, className, ...restProps }: TextButtonProps) {
  return (
    <button type='button' className={cn(textButtonVariants({ height }), className)} {...restProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
