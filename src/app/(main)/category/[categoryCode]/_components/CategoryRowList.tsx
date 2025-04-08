import Image from 'next/image';
import CheckBox from 'src/components/CheckBox/CheckBox';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import Button from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { CategoryProductListItem } from '../_dtos/getCategoryProductList.dto';
import dayjs from 'dayjs';

interface Props {
  categoryProductList: CategoryProductListItem[];
}

export default function CategoryRowList({ categoryProductList }: Props) {
  return (
    <ul>
      {categoryProductList &&
        categoryProductList.map((product) => (
          <li key={product.productId}>
            <article className='relative flex justify-between gap-10 h-[260px] pl-[30px] py-[30px]'>
              <div className='absolute top-[30px] left-0'>
                <CheckBox />
              </div>

              <div className='flex items-center gap-[30px] h-full'>
                {product.mainImageUrl && <Image src={product.mainImageUrl} width={150} height={100} alt='book image' className='book-item' />}

                <div className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-3'>
                      <h3 className='text-title-24r text-ui-text-title'>{product.authorName}</h3>
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
                    <div className='flex w-full h-[80px] px-[20px] py-[8px] border border-solid border-gray-300 rounded-[5px]'>
                      <p className='text-body-14l text-ui-text-title line-clamp-2'>{product.productSummary}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col items-center gap-2 w-fit'>
                <LineButton height={40}>찜하기</LineButton>
                <LineButton height={40}>카트 담기</LineButton>
                <Button height={40}>바로 구매</Button>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
