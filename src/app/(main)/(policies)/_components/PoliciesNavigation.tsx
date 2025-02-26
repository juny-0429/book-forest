'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from 'src/lib/utils';
import { appRoutes } from 'src/routes/appRoutes';

export default function PoliciesNavigation() {
  const pathname = usePathname();

  return (
    <nav className='flex justify-center items-center w-full h-fit mb-[50px]'>
      <ul className='flex justify-center items-center border border-solid border-gray-600 rounded-[10px] overflow-hidden'>
        {[
          { href: appRoutes.policies.termsOfService, label: '고객 이용 약관' },
          { href: appRoutes.policies.privacyPolicy, label: '개인정보처리방침' },
          { href: appRoutes.policies.youthProtection, label: '청소년보호정책' },
          { href: appRoutes.policies.marketingConsent, label: '개인정보 마케팅 활용 동의' },
        ].map((item, index) => (
          <React.Fragment key={item.href}>
            <li className={cn('text-title-24r text-ui-text-title p-5 transition', pathname === item.href ? 'bg-ui-main text-white' : 'hover:bg-gray-200')}>
              <Link href={item.href}>{item.label}</Link>
            </li>
            {index < 3 && <hr className='w-[1px] h-[64px] bg-gray-600' />}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
