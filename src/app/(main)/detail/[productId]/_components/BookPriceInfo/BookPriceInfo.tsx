import React from 'react';
import LucideIcons from 'src/theme/lucideIcon';
import { Badge } from 'src/components/Badge/Badge';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import Tooltip from 'src/components/Tooltip/Tooltip';
import BookMainImageSwiper from './BookMainImageSwiper';

interface BookPriceInfoProps {
  price: number;
  discount: number | null;
  deliveryPrice: number;
  mainImageList: string[];
  badges: string[];
}

export default function BookPriceInfo({ price, discount, deliveryPrice, mainImageList, badges }: BookPriceInfoProps) {
  return (
    <section className='flex flex-col gap-10 pb-8 border-b border-solid border-gray-300'>
      <div className='flex items-start gap-[100px]'>
        <BookMainImageSwiper mainImageList={mainImageList} />

        <div className='flex flex-col gap-20 w-full'>
          <ul className='flex items-center gap-1'>
            {badges &&
              badges.map((badge) => (
                <li key={badge}>
                  <Badge>{badge}</Badge>
                </li>
              ))}
          </ul>

          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <span className='text-body-18b text-ui-cta'>{discount}%</span>
              <span className='text-title-24b text-ui-text-title'>{calculateDiscountedPrice(price, discount).toLocaleString()}원</span>
              <span className='text-body-16l text-ui-text-title line-through'>{price.toLocaleString()}원</span>
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
                  <span className='text-body-18b text-ui-text-description'>{deliveryPrice.toLocaleString()}원</span>
                  <Tooltip position='left' content='배송정보를 확인해주세요.'>
                    <LucideIcons.Info className='text-gray-500' />
                  </Tooltip>
                </div>
              </div>

              <p className='text-body-18r text-ui-text-title'>14시 이전 주문시 오늘 출고</p>
            </div>

            <hr className='w-full h-[1px] bg-gray-600' />

            {/* <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2'>
                <StarRating rating={mockBookInfo.reviewRating} />
                <span className='text-body-18b text-ui-cta'>{mockBookInfo.reviewRating}</span>
              </div>

              <span className='text-body-18r text-ui-text-title'>리뷰({mockBookInfo.reviewCount})</span>
            </div> */}

            <hr className='w-full h-[1px] bg-gray-600' />
          </div>
        </div>
      </div>
    </section>
  );
}
