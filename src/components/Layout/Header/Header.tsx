'use client';

import Image from 'next/image';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import SearchBar from '../../SearchBar/SearchBar';
import LucideIcons from 'src/theme/lucideIcon';
import NavigationBar from '../NavigationBar/NavigationBar';
import { mockNavigationList } from '../NavigationBar/NavigationBar.data';
import { useAuth } from 'src/provider/authProvider';
import { useSignOut } from 'src/hooks/userLogout';

export default function Header() {
  const { user, loading, authority } = useAuth();
  const { signOut } = useSignOut();

  return (
    <header className='sticky top-0 z-100 bg-ui-background border-b border-solid border-gray-300 z-50 w-full'>
      <nav className='bg-gray-200'>
        <ul className='flex justify-end items-center w-full max-w-[1400px] mx-auto gap-5 px-[50px] py-[10px] text-ui-text-title '>
          {!user && !loading && (
            <li>
              <Link href={appRoutes.login} className='text-body-16m'>
                로그인
              </Link>
            </li>
          )}
          {!user && !loading && <hr className='w-[2px] h-[10px] bg-gray-600' />}
          {user && !loading && (
            <li>
              <button onClick={signOut} className='text-body-16m'>
                로그아웃
              </button>
            </li>
          )}
          {user && !loading && <hr className='w-[2px] h-[10px] bg-gray-600' />}
          <li>
            <Link href={appRoutes.signup} className='text-body-16m'>
              회원가입
            </Link>
          </li>
          <hr className='w-[2px] h-[10px] bg-gray-600' />
          <li>
            <Link href={appRoutes.shop.main} className='text-body-16m'>
              마이페이지
            </Link>
          </li>
          <hr className='w-[2px] h-[10px] bg-gray-600' />
          <li>
            <Link href={appRoutes.cart} className='text-body-16m'>
              장바구니
            </Link>
          </li>
        </ul>
      </nav>

      <div className='flex justify-between items-center w-full max-w-[1200px] mx-auto py-3'>
        <div className='flex flex-col items-start gap-[20px] w-fit'>
          <h1 className='flex items-center gap-[40px] w-full'>
            <Link href='/'>
              <Image src={KoLogo} width={120} alt='logo image' />
            </Link>
            <SearchBar className='w-[400px]' placeholder='검색어를 입력하세요' />
          </h1>

          <NavigationBar navigationList={mockNavigationList} />
        </div>

        <div className='flex justify-center items-center gap-[20px]'>
          <Link href={appRoutes.cart} className='flex justify-center items-center w-[60px] h-[60px] text-gray-800'>
            <LucideIcons.ShoppingCart size={40} />
          </Link>

          <Link href={appRoutes.shop.main} className='flex justify-center items-center w-[60px] h-[60px] bg-green-700 text-white rounded-full shadow-blur-6-50'>
            <LucideIcons.User size={30} />
          </Link>
        </div>
      </div>
    </header>
  );
}
