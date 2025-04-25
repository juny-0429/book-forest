import Image from 'next/image';
import Link from 'next/link';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { WishlistItemDto } from '../_dtos/GetWhislistItem.dto';
import { appRoutes } from 'src/routes/appRoutes';

interface Props {
  wishlist: WishlistItemDto[];
  selectedProductIds: number[];
  onToggleSelect: (productId: number) => void;
}

export default function WishlistGridList({ wishlist, selectedProductIds, onToggleSelect }: Props) {
  return (
    <ul className='grid grid-cols-6 gap-x-10 gap-y-[60px] ml-[30px]'>
      {wishlist &&
        wishlist.map((book) => (
          <li key={book.productId} className='flex justify-end'>
            <article className='relative flex flex-col gap-5 w-fit'>
              <div className='absolute top-0 left-[-30px]'>
                <CheckBox checked={selectedProductIds.includes(book.productId)} onChange={() => onToggleSelect(book.productId)} />
              </div>

              {book.mainImageUrl && (
                <Link href={`${appRoutes.productDetail}/${book.productId}`} className='h-[230px]'>
                  <Image src={book.mainImageUrl} width={160} height={160} alt='product image' className='book-item' />
                </Link>
              )}

              <div className='flex flex-col items-center gap-1'>
                <h3 className='text-body-16m text-ui-text-title'>{book.productName}</h3>

                <address className='flex justify-center items-baseline gap-1'>
                  <cite className='text-body-14m text-ui-text-description'>{book.authorName}</cite>
                  <hr className='w-[1px] h-2 bg-gray-600' />
                  <span className='text-body-14m text-ui-text-description whitespace-nowrap'>{book.publisher}</span>
                </address>

                {book.discount && book.discount > 0 ? (
                  <div className='flex items-center gap-2'>
                    <span className='text-body-16b text-ui-cta'>{book.discount}%</span>
                    <span className='text-body-18m text-ui-text-title'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</span>
                  </div>
                ) : (
                  <span className='text-body-18m text-ui-text-title'>{book.price.toLocaleString()}원</span>
                )}
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
