import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-[8px] py-[2px] text-body-12r', {
  variants: {
    variant: {
      positive: 'bg-state-positive text-white',
      informative: 'bg-state-informative text-white',
      warning: 'bg-state-warning text-white',
      delay: 'bg-state-delay text-white',
      linePositive: 'border border-solid  border-state-positive text-state-positive',
      lineInformative: 'border border-solid  border-state-informative text-state-informative',
      lineWarning: 'border border-solid  border-state-warning text-state-warning',
      lineDelay: 'border border-solid  border-state-delay text-state-delay',
    },
  },
  defaultVariants: {
    variant: 'positive',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
