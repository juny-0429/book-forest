import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import LucideIcons from 'src/theme/lucideIcon';
import { BookListItem } from '../page';

interface Props {
  bookList: BookListItem[];
}

export default function CategoryGridList({ bookList }: Props) {
  return (
    <ul className='grid grid-cols-5 w-full gap-y-10'>
      {bookList &&
        bookList.map((book) => (
          <li key={book.id}>
            <Link href='' className='flex justify-center items-center'>
              <article className='relative flex flex-col gap-10 w-[180px]'>
                <div className='absolute top-0 left-[-30px]'>
                  <CheckBox></CheckBox>
                </div>
                <Image src={book.bookImage} alt='book image' />

                <div className='flex justify-between items-start'>
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-body-18b text-ui-text-title'>새 마음으로</h3>

                    <div className='flex items-center gap-2'>
                      <span className='text-body-14r text-ui-text-description'>{book.author}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-14r text-ui-text-description'>{book.publisher}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <span className='text-body-16b text-ui-cta'>{book.discount}%</span>
                      <span className='text-body-18m text-ui-text-title'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</span>
                    </div>
                  </div>

                  <div className='space-x-2'>
                    <button>
                      <LucideIcons.ShoppingCart size={27} className='text-gray-400 hover:text-ui-cta' />
                    </button>
                    <button>
                      <LucideIcons.Heart size={27} className='text-gray-400 hover:text-red-500' />
                    </button>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
    </ul>
  );
}
