import Image from 'next/image';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { CategoryProductListItem } from '../_dtos/getCategoryProductList.dto';
import dayjs from 'dayjs';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';
import { useCart } from 'src/app/(main)/cart/_hooks/useCart';
import { toastMessage } from 'src/hooks/useToast';

interface Props {
  categoryProductList: CategoryProductListItem[];
  selectedProductIds: number[];
  onToggleProduct: (productId: number) => void;
}

export default function CategoryRowList({ categoryProductList, selectedProductIds, onToggleProduct }: Props) {
  const { addToCart } = useCart();

  return (
    <ul>
      {categoryProductList &&
        categoryProductList.map((product) => (
          <li key={product.productId}>
            <article className='relative flex justify-between gap-10 h-[260px] pl-[30px] py-[30px]'>
              <div className='absolute top-[30px] left-0'>
                <CheckBox checked={selectedProductIds.includes(product.productId)} onChange={() => onToggleProduct(product.productId)} />
              </div>

              <div className='flex items-center gap-[30px] h-full'>
                {product.mainImageUrl && (
                  <Link href={`${appRoutes.productDetail}/${product.productId}`} className='min-w-[150px]'>
                    <Image src={product.mainImageUrl} width={150} height={100} alt='book image' className='book-item' />
                  </Link>
                )}

                <div className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-3'>
                      <Link href={`${appRoutes.productDetail}/${product.productId}`} className='hover:underline'>
                        <h3 className='text-title-24r text-ui-text-title'>{product.productName}</h3>
                      </Link>
                      <button>
                        <LucideIcons.Heart size={26} className='text-gray-500' />
                      </button>
                    </div>

                    <address className='flex items-center gap-2'>
                      <cite className='text-body-16m text-ui-text-description'>{product.authorName}</cite>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-16m text-ui-text-description'>{product.publisher}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <time className='text-body-16m text-ui-text-description'>{dayjs(product.publishedDate).format('YYYY년 MM월 DD일')} 출판</time>
                    </address>

                    <div className='flex items-center gap-2'>
                      <span className='text-body-16b text-ui-cta'>{product.discount}%</span>
                      <span className='text-body-18b text-ui-text-title'>{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}원</span>
                      <span className='text-body-16l text-ui-text-description line-through'>{product.price.toLocaleString()}원</span>
                    </div>
                  </div>

                  {product.productSummary && (
                    <div className='flex w-[700px] h-[80px] px-[20px] py-[8px] border border-solid border-gray-300 rounded-[5px]'>
                      <p className='text-body-14l text-ui-text-title line-clamp-2'>{product.productSummary}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col items-center gap-2 w-fit'>
                <LineButton height={40}>찜하기</LineButton>
                <LineButton
                  height={40}
                  onClick={() => {
                    addToCart({ productId: product.productId, count: 1 });
                    toastMessage({
                      title: '장바구니 담기 완료',
                      content: '상품이 장바구니에 담겼습니다.',
                      type: 'success',
                    });
                  }}
                >
                  카트 담기
                </LineButton>
                <Button height={40}>바로 구매</Button>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
