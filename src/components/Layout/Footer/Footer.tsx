import Image from 'next/image';
import React from 'react';
import LucideIcons from 'src/theme/lucideIcon';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';

export default function Footer() {
  return (
    <footer className='w-full bg-gray-200'>
      <nav>
        <ul className='flex justify-center items-center gap-[30px] py-4 border-y border-solid border-gray-400'>
          <li className='hover:underline'>
            <Link href={appRoutes.policies.companyInfo}>회사소개</Link>
          </li>

          <hr className='w-[1px] h-[8px] bg-gray-600' />

          <li className='hover:underline'>
            <Link href={appRoutes.policies.termsOfService}>이용약관</Link>
          </li>

          <hr className='w-[1px] h-[8px] bg-gray-600' />

          <li className='font-bold hover:underline'>
            <Link href={appRoutes.policies.privacyPolicy}>개인정보처리방침</Link>
          </li>

          <hr className='w-[1px] h-[8px] bg-gray-600' />

          <li className='hover:underline'>
            <Link href={appRoutes.policies.youthProtection}>청소년보호정책</Link>
          </li>

          <hr className='w-[1px] h-[8px] bg-gray-600' />

          <li className='hover:underline'>
            <Link href={appRoutes.careers}>채용정보</Link>
          </li>

          <hr className='w-[1px] h-[8px] bg-gray-600' />

          <li className='hover:underline'>
            <Link href={appRoutes.bulkPurchase}>학교•기업•기관 대량구매</Link>
          </li>
        </ul>
      </nav>

      <div className='flex justify-between items-center px-[100px] py-[50px]'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-10'>
            <Link href='/'>
              <Image src={KoLogo} width={85} alt='logo image' />
            </Link>

            <ul className='flex items-center gap-4'>
              <li>
                <a href='#' target='_blank' rel='noopener noreferrer' className='flex justify-center items-center p-1 text-white bg-gray-600 rounded-full'>
                  <LucideIcons.Youtube />
                </a>
              </li>

              <li>
                <a href='#' target='_blank' rel='noopener noreferrer' className='flex justify-center items-center p-1 text-white bg-gray-600 rounded-full'>
                  <LucideIcons.Instagram />
                </a>
              </li>

              <li>
                <a href='#' target='_blank' rel='noopener noreferrer' className='flex justify-center items-center p-1 text-white bg-gray-600 rounded-full'>
                  <LucideIcons.Facebook />
                </a>
              </li>
            </ul>
          </div>

          {/* 회사 정보 */}
          <div className='flex flex-col gap-3'>
            <dl className='flex flex-wrap items-center gap-3 w-[707px] text-body-14r text-ui-text-title'>
              <div className='flex items-center gap-1'>
                <dt>회사</dt>
                <dd>주식회사 책숲 (Book Forest Co., Ltd.)</dd>
              </div>

              <hr className='w-[1px] h-[8px] bg-gray-600' />

              <div className='flex items-center gap-1'>
                <dt>대표 이사</dt>
                <dd>박준영</dd>
              </div>

              <hr className='w-[1px] h-[8px] bg-gray-600' />

              <div className='flex items-center gap-1'>
                <dt>주소</dt>
                <dd>서울특별시 강남구 테헤란로 123, 책숲타워 10층</dd>
              </div>

              <div className='flex items-center gap-1'>
                <dt>이메일</dt>
                <dd>support@bookforest.com</dd>
              </div>

              <hr className='w-[1px] h-[8px] bg-gray-600' />

              <div className='flex items-center gap-1'>
                <dt>사업자등록번호</dt>
                <dd>1111-11-11111</dd>
              </div>

              <hr className='w-[1px] h-[8px] bg-gray-600' />

              <div className='flex items-center gap-1'>
                <dt>통신판매업 신고번호</dt>
                <dd>제2025-서울강남-12345호</dd>
              </div>
            </dl>

            <p className='text-body-14l text-ui-text-description'>Copyright: © 2025 Book Forest Co., Ltd. All rights reserved.</p>
          </div>
        </div>

        {/* 고객센터 */}
        <dl className='flex flex-col gap-2'>
          <div className='flex items-center gap-1 text-title-24b text-ui-text-title'>
            <dt>고객센터</dt>
            <dd>1234-5678</dd>
          </div>

          <div className='flex items-center gap-2 pl-3 text-body-16r text-ui-text-body'>
            <dt>운영시간 :</dt>
            <dd>09:00 - 18:00</dd>
          </div>

          <div className='flex items-center gap-2 pl-3 text-body-16r text-ui-text-body'>
            <dt>점심시간 :</dt>
            <dd>12:00 - 13:00</dd>
          </div>

          <div className='flex items-center gap-2 pl-3 text-body-16r text-ui-text-body'>
            <dt>휴무일 :</dt>
            <dd>주말 및 공휴일</dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
