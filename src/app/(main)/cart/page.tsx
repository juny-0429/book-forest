import Image from 'next/image';
import React from 'react';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import CheckBox from 'src/components/CheckBox/CheckBox';
import LucideIcons from 'src/theme/lucideIcon';
import SampleBookImg from '@/assets/images/books/새마음으로.jpg';
import { Badge } from 'src/components/Badge/Badge';

export default function CartPage() {
  const mockCartList = Array.from({ length: 3 }, (_, index) => ({
    id: `${index + 1}`,
    title: '끝내주는 인생',
    price: 13500,
    originalPrice: 15000,
    discount: 10,
    quantity: 1,
    delivery: '새벽배송',
    deliveryInfo: '내일 새벽 7시 이전 도착 예정',
    image: SampleBookImg,
  }));

  return (
    <div>
      <h2 className='text-title-32b text-ui-text-title'>장바구니(3)</h2>

      {/* 카트 상품 리스트 */}
      <div>
        <div className='flex justify-between'>
          <CheckBox>모두 선택</CheckBox>

          <div className='flex justify-center items-center gap-1'>
            <LineButton height={40} color='gray' leftIcon={<LucideIcons.Heart size={20} />}>
              찜하기
            </LineButton>
            <LineButton height={40} color='gray' leftIcon={<LucideIcons.Trash2 size={20} />}>
              삭제
            </LineButton>
          </div>
        </div>

        <div></div>

        <div className='flex justify-center gap-10'>
          {/* 장바구니 목록 */}
          <div className='flex flex-col items-end gap-5'>
            <ul className='mt-5 mb-5'>
              {mockCartList &&
                mockCartList.map((item, index) => (
                  <li key={item.id} className='relative flex border-t border-b border-solid border-gray-300'>
                    <button className='absolute top-3 right-0'>
                      <LucideIcons.X className='text-gray-600' />
                    </button>

                    <article className='flex gap-3 h-full px-[50px] py-[10px]'>
                      <CheckBox></CheckBox>
                      <Image src={SampleBookImg} width={70} alt='book image' className='book-item' />

                      <div className='flex flex-col gap-3'>
                        <p className='text-body-16m text-ui-text-title'>끝내주는 인생</p>

                        <div className='flex items-center gap-1'>
                          <span className='text-body-14b text-ui-cta'>10%</span>
                          <span className='text-body-16b text-ui-text-title'>13500원</span>
                          <span className='text-body-14l text-ui-text-description line-through'>15000원</span>
                        </div>
                      </div>
                    </article>

                    <div className='flex flex-col justify-center items-center gap-4 px-5 border-l border-r border-solid border-gray-300'>
                      <p className='text-body-18b'>13500원</p>

                      <div className='flex justify-between items-center gap-2 w-[75px] h-fit p-2 border border-solid border-gray-300 rounded-[5px]'>
                        <button>
                          <LucideIcons.Minus size={16} />
                        </button>
                        <span className='text-body-16r text-ui-text-title'>1</span>
                        <button>
                          <LucideIcons.Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className='flex flex-col justify-center gap-3 px-[50px]'>
                      <Badge variant='linesuccess' className='w-fit'>
                        새벽배송
                      </Badge>

                      <p className='text-body-14m text-ui-text-title'>내일 새벽 7시 이전 도착 예정</p>
                    </div>
                  </li>
                ))}
            </ul>

            <LineButton height={40} className='w-fit'>
              장바구니 유의사항
            </LineButton>
          </div>

          {/* 결제창 */}
          <aside className='flex flex-col items-center gap-5 w-[240px]'>
            <div className='flex flex-col items-center gap-3 w-full p-5 border border-solid border-gray-900 rounded-[6px]'>
              <div className='flex justify-between items-center w-full'>
                <span className='text-body-14l text-ui-text-description'>총 상품 금액</span>
                <span className='text-body-14m text-ui-text-title'>30000원</span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='text-body-14l text-ui-text-description'>배송비</span>
                <span className='text-body-14m text-ui-text-title'>3000원</span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='text-body-14l text-ui-text-description'>상품 할인</span>
                <span className='text-body-14m text-ui-text-title'>13000원</span>
              </div>

              <hr className='w-full h-[1px] bg-gray-600' />

              <div className='flex justify-between items-center w-full'>
                <strong className='text-body-14m text-ui-text-title'>결제 금액</strong>
                <strong className='text-body-16b text-ui-text-title'>20000원</strong>
              </div>
            </div>

            <Button height={40}>N개 상품 주문하기</Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
