import Image from 'next/image';
import Link from 'next/link';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { WishlistItem } from '../page';
import { formatPublishedDate } from 'src/utils/formatDateUtils';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';

interface Props {
  wishlist: WishlistItem[];
}

export default function WishlistRowList({ wishlist }: Props) {
  return (
    <ul>
      {wishlist &&
        wishlist.map((book) => (
          <li key={book.id}>
            <article className='relative flex justify-between h-[260px] pl-[30px] py-[30px]'>
              <div className='absolute top-[30px] left-0'>
                <CheckBox />
              </div>

              <div className='flex items-center gap-[30px] h-full'>
                <Image src={book.bookImage} alt='book image' className='book-item w-fit h-full object-contain' />

                <div className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col gap-4'>
                    <p className='text-title-24r text-ui-text-title'>{book.title}</p>

                    <address className='flex items-center gap-2'>
                      <cite className='text-body-16m text-ui-text-description'>{book.author}</cite>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-16m text-ui-text-description'>{book.publisher}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <time className='text-body-16m text-ui-text-description'>{formatPublishedDate(book.publishedAt)} 출판</time>
                    </address>

                    <div className='flex items-center gap-2'>
                      <span className='text-body-16b text-ui-cta'>{book.discount}%</span>
                      <span className='text-body-18b text-ui-text-title'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</span>
                      <span className='text-body-16l text-ui-text-description line-through'>{book.price.toLocaleString()}원</span>
                    </div>
                  </div>

                  <div className='flex justify-center items-center w-fit px-[25px] py-[15px] border border-solid border-gray-300 rounded-[5px]'>
                    <p className='text-body-14r text-ui-text-title'>{book.description}</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-center gap-2 w-fit'>
                <Button height={40}>카트 담기</Button>
                <Button height={40}>바로 구매</Button>
                <LineButton height={40}>삭제</LineButton>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
