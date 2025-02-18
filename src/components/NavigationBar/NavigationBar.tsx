'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'src/lib/utils';

interface NavigationItem {
  label: string;
  url: string;
  isActive: boolean;
}

interface NavigationBarProps {
  navigationList: NavigationItem[];
}

export default function NavigationBar({ navigationList }: NavigationBarProps) {
  const pathname = usePathname();

  const activeNavigationItems = navigationList.filter((navItem) => navItem.isActive);

  return (
    <nav>
      <ul className='flex items-center gap-[30px]'>
        {activeNavigationItems.map((navItem) => (
          <li key={navItem.label} className='text-title-16b'>
            <Link href={navItem.url} className={cn(pathname === navItem.url ? 'text-ui-cta' : 'text-ui-text-title')}>
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
