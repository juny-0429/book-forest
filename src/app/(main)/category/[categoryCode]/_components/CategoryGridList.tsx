import Image from 'next/image';
import Link from 'next/link';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { CategoryProductListItem } from '../_dtos/getCategoryProductList.dto';
import { appRoutes } from 'src/routes/appRoutes';

interface Props {
  categoryProductList: CategoryProductListItem[];
}

export default function CategoryGridList({ categoryProductList }: Props) {
  return (
    <ul className='grid grid-cols-5 w-full gap-y-10'>
      {categoryProductList &&
        categoryProductList.map((product) => (
          <li key={product.productId}>
            <Link href={`${appRoutes.productDetail}/${product.productId}`} className='flex justify-center items-center'>
              <article className='relative flex flex-col justify-between w-[180px]'>
                <div className='absolute top-0 left-[-30px]'>
                  <CheckBox></CheckBox>
                </div>
                {product.mainImageUrl && (
                  <div className='h-[270px]'>
                    <Image src={product.mainImageUrl} width={160} height={160} alt='product image' className='book-item' />
                  </div>
                )}

                <div className='flex justify-between items-start'>
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-body-18b text-ui-text-title'>{product.productName}</h3>

                    <div className='flex items-baseline gap-2'>
                      <span className='text-body-14r text-ui-text-description'>{product.authorName}</span>
                      <hr className='w-[1px] h-2 bg-gray-600' />
                      <span className='text-body-14r text-ui-text-description whitespace-nowrap'>{product.publisher}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <span className='text-body-16b text-ui-cta'>{product.discount}%</span>
                      <span className='text-body-18m text-ui-text-title'>{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
    </ul>
  );
}
