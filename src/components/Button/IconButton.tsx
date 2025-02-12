import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  children: React.ReactNode;
}

const iconButtonVariants = cva('flex justify-center items-center border border-gray-300 text-ui-text-title disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-gray-300', {
  variants: {
    height: {
      24: 'size-[24px] rounded-[4px]',
      32: 'size-[32px] rounded-[6px]',
      40: 'size-[40px] rounded-[8px]',
    },
  },
});

export default function IconButton({ height = 24, children, className, ...restProps }: IconButtonProps) {
  return (
    <button type='button' {...restProps} className={cn(iconButtonVariants({ height }), className)}>
      {children}
    </button>
  );
}
