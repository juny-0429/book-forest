import React from 'react';
import SampleBookImg from '@/assets/images/books/두사람의인터네셔널.jpg';
import LucideIcons from 'src/theme/lucideIcon';
import Image from 'next/image';
import { Badge } from 'src/components/Badge/Badge';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import Tooltip from 'src/components/Tooltip/Tooltip';
import StarRating from './StarRating';
import { mock } from 'node:test';

export default function BookPriceInfo() {
  const mockBookInfo = {
    title: '두 사람의 인터네셔널',
    author: '김기태',
    publisher: '문학동네',
    publishedDate: '2025-02-02',
    price: 18000,
    discount: 10,
    deliveryInfo: '무료배송',
    reviewRating: 4.5,
    reviewCount: 26,
    event: 'B tv 이동진의 파이아키아 추천도서 + 알라딘 굿즈 (이벤트 도서 포함 국내서 2만원 이상)',
    bookImg: SampleBookImg,
    badges: ['무료배송', '사은품', 'Md 추천'],
  };

  return (
    <section className='flex flex-col gap-10'>
      {/* header */}
      <div className='flex justify-between items-center py-5'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-title-24b'>{mockBookInfo.title}</h2>
          <div className='flex items-center gap-2'>
            <span className='text-body-16r text-ui-text-description'>{mockBookInfo.author} (지은이)</span>
            <hr className='w-[1px] h-[8px] bg-gray-600' />
            <span className='text-body-16r text-ui-text-description'>{mockBookInfo.publisher}</span>
            <hr className='w-[1px] h-[8px] bg-gray-600' />
            <time className='text-body-16r text-ui-text-description'>{mockBookInfo.publishedDate}</time>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button>
            <LucideIcons.Heart size={30} />
          </button>
          <button>
            <LucideIcons.Share2 size={30} />
          </button>
        </div>
      </div>

      <hr className='w-full h-[1px] bg-gray-600' />

      <div className='flex items-start gap-[110px]'>
        <div className='w-[400px] min-w-[400px] flex-shrink-0'>
          <Image src={mockBookInfo.bookImg} alt='book image' className='book-item shadow-blur-4-25' />
        </div>

        <div className='flex flex-col gap-20 w-full'>
          <ul className='flex items-center gap-1'>
            {mockBookInfo.badges.map((badge, index) => (
              <li>
                <Badge>{badge}</Badge>
              </li>
            ))}
          </ul>

          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <span className='text-body-18b text-ui-cta'>{mockBookInfo.discount}%</span>
              <span className='text-title-24b text-ui-text-title'>{calculateDiscountedPrice(mockBookInfo.price, mockBookInfo.discount).toLocaleString()}원</span>
              <span className='text-body-16l text-ui-text-title line-through'>{mockBookInfo.price.toLocaleString()}원</span>
            </div>

            <hr className='w-full h-[1px] bg-gray-600' />

            <div className='flex justify-between items-center'>
              <span className='text-body-18b text-ui-text-title'>적립/혜택</span>

              <div className='flex justify-center items-center gap-4'>
                <span className='text-body-18b text-ui-cta'>840P</span>
                <Tooltip position='left' content='적립 혜택 약관을 확인해주세요.'>
                  <LucideIcons.Info className='text-green-500' />
                </Tooltip>
              </div>
            </div>

            <hr className='w-full h-[1px] bg-gray-600' />

            <div className='flex flex-col items-end gap-2'>
              <div className='flex justify-between items-center w-full'>
                <span className='text-body-18b text-ui-text-title'>배송안내</span>

                <div className='flex justify-center items-center gap-4'>
                  <span className='text-body-18b text-ui-text-description'>{mockBookInfo.deliveryInfo}</span>
                  <Tooltip position='left' content='배송정보를 확인해주세요.'>
                    <LucideIcons.Info className='text-gray-500' />
                  </Tooltip>
                </div>
              </div>

              <p className='text-body-18r text-ui-text-title'>14시 이전 주문시 오늘 출고</p>
            </div>

            <hr className='w-full h-[1px] bg-gray-600' />

            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2'>
                <StarRating rating={mockBookInfo.reviewRating} />
                <span className='text-body-18b text-ui-cta'>{mockBookInfo.reviewRating}</span>
              </div>

              <span className='text-body-18r text-ui-text-title'>리뷰({mockBookInfo.reviewCount})</span>
            </div>

            <hr className='w-full h-[1px] bg-gray-600' />
          </div>
        </div>
      </div>
    </section>
  );
}
