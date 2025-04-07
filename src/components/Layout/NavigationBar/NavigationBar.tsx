'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from 'src/components/NavigationMenu/navigation-menu';
import { cn } from 'src/lib/utils';
import { mockNavigationList } from '../NavigationBar/NavigationBar.data';
import { useGetCategoryList } from 'src/app/admin/(product-management)/categories/_hooks/react-query/useGetCategoryList';
import LucideIcons from 'src/theme/lucideIcon';

export default function NavigationBar() {
  const pathname = usePathname();

  const activeNavigationItems = mockNavigationList.filter((navItem) => navItem.isActive);

  const { data } = useGetCategoryList('ALL');

  const nestedCategoryList = data
    ?.filter((cat) => !cat.parentName || cat.parentName === '-') // 대분류만 필터
    .map((parent) => ({
      ...parent,
      subCategories: data?.filter((child) => child.parentName === parent.categoryName).sort((a, b) => a.categoryId - b.categoryId),
    }))
    .sort((a, b) => a.categoryId - b.categoryId);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {activeNavigationItems.map((category) =>
          category.label === '카테고리' ? (
            <NavigationMenuItem key={category.label}>
              <NavigationMenuTrigger
                className={cn('!text-title-16b px-[15px] py-[13px] hover:text-ui-cta', pathname === category.url ? 'text-ui-cta border-b-2 border-solid border-ui-cta' : 'text-ui-text-title')}
              >
                카테고리
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='w-[800px] px-8 py-6 bg-white'>
                  <span className='block text-title-24r text-ui-main mb-4'>전체 카테고리</span>

                  <ul className='grid grid-cols-[.75fr_.75fr_.75fr_1fr] gap-x-4'>
                    {nestedCategoryList?.map((parent) => (
                      <li key={parent.categoryId} className='row-span-3 pb-5'>
                        <Link href='' className='flex justify-between items-center mb-3 mr-4'>
                          <span className='text-body-16b text-ui-text-title'>{parent.categoryName}</span>

                          <LucideIcons.ChevronRight size={16} />
                        </Link>

                        <ul className='flex flex-col gap-1'>
                          {parent.subCategories?.map((child) => (
                            <li key={child.categoryId}>
                              <NavigationMenuLink asChild>
                                <a href={`/category/${child.categoryCode.toLowerCase()}`} className='text-body-14l hover:text-ui-cta transition'>
                                  {child.categoryName}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={category.label}>
              <Link href={category.url} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn('!text-title-16b px-[15px] pb-[13px] hover:text-ui-cta', pathname === category.url ? 'text-ui-cta border-b-2 border-solid border-ui-cta' : 'text-ui-text-title')}
                >
                  {category.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
