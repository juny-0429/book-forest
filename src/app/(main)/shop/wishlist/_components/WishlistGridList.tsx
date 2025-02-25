import Image from 'next/image';
import Link from 'next/link';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { WishlistItem } from '../page';

interface Props {
  wishlist: WishlistItem[];
}

export default function WishlistGridList({ wishlist }: Props) {
  return (
    <ul className='grid grid-cols-6 gap-x-8 gap-y-[60px]'>
      {wishlist &&
        wishlist.map((book) => (
          <li key={book.id} className='flex justify-end'>
            <article className='relative flex flex-col gap-5 w-fit'>
              <div className='absolute top-0 left-[-30px]'>
                <CheckBox />
              </div>

              <Link href='#'>
                <Image src={book.bookImage} width={120} alt={`${book.title} 표지`} className='book-item' />
              </Link>

              <div className='flex flex-col items-center gap-1'>
                <p className='text-body-16m text-ui-text-title'>{book.title}</p>

                <address className='flex justify-center items-center gap-2'>
                  <cite className='text-body-14m text-ui-text-description'>{book.author}</cite>
                  <hr className='w-[1px] h-2 bg-gray-600' />
                  <span className='text-body-14m text-ui-text-description'>{book.publisher}</span>
                </address>

                <p className='text-body-16b text-ui-cta'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</p>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
