import Image from 'next/image';
import Link from 'next/link';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import { WishlistItemDto } from '../_dtos/GetWhislistItem.dto';
import dayjs from 'dayjs';
import { appRoutes } from 'src/routes/appRoutes';
import { toastMessage } from 'src/hooks/useToast';
import { useCart } from 'src/app/(main)/cart/_hooks/useCart';

interface Props {
  wishlist: WishlistItemDto[];
}

export default function WishlistRowList({ wishlist }: Props) {
  const { addToCart } = useCart();

  return (
    <ul>
      {wishlist &&
        wishlist.map((book) => (
          <li key={book.productId}>
            <article className='relative flex justify-between h-[260px] pl-[30px] py-[30px]'>
              <div className='absolute top-[15px] left-0'>
                <CheckBox />
              </div>

              <div className='flex items-center gap-[30px] h-full'>
                {book.mainImageUrl && (
                  <Link href={`${appRoutes.productDetail}/${book.productId}`} className='min-w-[150px]'>
                    <Image src={book.mainImageUrl} width={150} height={100} alt='book image' className='book-item' />
                  </Link>
                )}

                <div className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col gap-3'>
                    <Link href={`${appRoutes.productDetail}/${book.productId}`} className='hover:underline'>
                      <h3 className='text-title-24r text-ui-text-title'>{book.productName}</h3>
                    </Link>

                    <address className='flex items-center gap-2'>
                      <cite className='text-body-16m text-ui-text-description'>{book.authorName}</cite>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-16m text-ui-text-description'>{book.publisher}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <time className='text-body-16m text-ui-text-description'>{dayjs(book.publishedDate).format('YYYY년 MM월 DD일')} 출판</time>
                    </address>

                    {book.discount ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-body-16b text-ui-cta'>{book.discount}%</span>
                        <span className='text-body-18b text-ui-text-title'>{calculateDiscountedPrice(book.price, book.discount).toLocaleString()}원</span>
                        <span className='text-body-16l text-ui-text-description line-through'>{book.price.toLocaleString()}원</span>
                      </div>
                    ) : (
                      <span className='text-body-18b text-ui-text-title'>{book.price.toLocaleString()}원</span>
                    )}
                  </div>{' '}
                </div>
              </div>

              <div className='flex flex-col items-center gap-2 w-fit'>
                <Button
                  height={40}
                  onClick={() => {
                    addToCart({ productId: book.productId, stock: 1 });
                    toastMessage({
                      title: '장바구니 담기 완료',
                      content: '상품이 장바구니에 담겼습니다.',
                      type: 'success',
                    });
                  }}
                >
                  카트 담기
                </Button>
                <Button height={40}>바로 구매</Button>
                <LineButton height={40}>삭제</LineButton>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
