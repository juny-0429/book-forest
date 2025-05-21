import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-[8px] py-[2px] text-body-12r', {
  variants: {
    variant: {
      success: 'bg-state-success text-white',
      informative: 'bg-state-informative text-white',
      error: 'bg-state-error text-white',
      warning: 'bg-state-warning text-white',
      linesuccess: 'border border-solid  border-state-success text-state-success',
      lineInformative: 'border border-solid  border-state-informative text-state-informative',
      lineerror: 'border border-solid  border-state-error text-state-error',
      linewarning: 'border border-solid  border-state-warning text-state-warning',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
