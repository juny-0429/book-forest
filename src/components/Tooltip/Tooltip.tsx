'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
}

const tooltipVariants = cva('absolute whitespace-nowrap px-3 py-2 text-sm bg-white text-body-14m rounded-[4px] border border-solid border-gray-600 shadow-blur-4-25 transition-opacity', {
  variants: {
    position: {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    },
  },
  defaultVariants: {
    position: 'top',
  },
});

export default function Tooltip({ content, children, position }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className='relative inline-block'>
      {/* 트리거 요소 */}
      <div className='cursor-pointer' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {children}
      </div>

      {/* 툴팁 컨텐츠 */}
      {visible && <div className={cn(tooltipVariants({ position }))}>{content}</div>}
    </div>
  );
}
