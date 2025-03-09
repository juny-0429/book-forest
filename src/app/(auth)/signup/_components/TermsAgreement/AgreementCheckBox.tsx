'use client';

import React from 'react';
import Link from 'next/link';
import { UseFormRegisterReturn } from 'react-hook-form';
import CheckBox from 'src/components/CheckBox/CheckBox';
import LucideIcons from 'src/theme/lucideIcon';

interface AgreementCheckBoxProps {
  label: string;
  required?: boolean;
  link?: string;
  checked: boolean;
  register: UseFormRegisterReturn;
}

export default function AgreementCheckBox({ label, required, link, checked, register }: AgreementCheckBoxProps) {
  return (
    <div className='flex justify-between items-center w-full'>
      <CheckBox checked={checked} {...register}>
        {label}
        {required ? <span className='ml-2 text-caption-12r text-ui-cta'>(필수)</span> : <span className='ml-2 text-caption-12r text-ui-text-description'>(선택)</span>}
      </CheckBox>
      {link && (
        <Link href={link}>
          <LucideIcons.ChevronRight />
        </Link>
      )}
    </div>
  );
}
