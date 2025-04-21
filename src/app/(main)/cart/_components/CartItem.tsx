import Image from 'next/image';
import { Badge } from 'src/components/Badge/Badge';
import CheckBox from 'src/components/CheckBox/CheckBox';
import LucideIcons from 'src/theme/lucideIcon';
import { calculateDiscountedPrice } from 'src/utils/priceUtils';
import { CartListItemDto } from '../_dtos/getCartList.dto';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';

interface CartItemProps {
  item: CartListItemDto;
  count: number;
  onCartItemRemove: (productId: number) => void;
  onCountChange: (productId: number, count: number) => void;
  checked: boolean;
  onToggle: () => void;
}

export default function CartItem({ item, count, onCartItemRemove, onCountChange, checked, onToggle }: CartItemProps) {
  const finalPrice = calculateDiscountedPrice(item.price, item.discount) * count;

  return (
    <li key={item.productId} className='relative flex border-b border-solid border-gray-300'>
      <button className='absolute top-3 right-3' onClick={() => onCartItemRemove(item.productId)}>
        <LucideIcons.X strokeWidth={1} className='text-gray-600' />
      </button>

      <article className='flex items-start gap-3 w-[500px] h-full px-[50px] py-[10px]'>
        <CheckBox checked={checked} onChange={onToggle} />

        <Link href={`${appRoutes.productDetail}/${item.productId}`}>
          <Image src={item.mainImageUrl} width={70} height={50} alt='book image' className='book-item' />
        </Link>

        <div className='flex flex-col gap-3'>
          <Link href={`${appRoutes.productDetail}/${item.productId}`} className='hover:underline'>
            <p className='text-body-16m text-ui-text-title'>{item.productName}</p>
          </Link>
          {item.discount > 0 ? (
            <div className='flex items-center gap-1'>
              <span className='text-body-14b text-ui-cta'>{item.discount}%</span>
              <span className='text-body-16b text-ui-text-title'>{calculateDiscountedPrice(item.price, item.discount).toLocaleString()}원</span>
              <span className='text-body-14l text-ui-text-description line-through'>{item.price.toLocaleString()}원</span>
            </div>
          ) : (
            <span className='text-body-16b text-ui-text-title'>{item.price.toLocaleString()}원</span>
          )}
        </div>
      </article>

      <div className='flex flex-col justify-center items-center gap-4 px-10 border-l border-r border-solid border-gray-300'>
        <p className='text-body-18b'>{finalPrice.toLocaleString()}원</p>

        <div className='flex justify-between items-center gap-2 w-[75px] h-fit p-2 border border-solid border-gray-300 rounded-[5px]'>
          <button onClick={() => onCountChange(item.productId, Math.max(count - 1, 1))}>
            <LucideIcons.Minus size={16} />
          </button>
          <span className='text-body-16r text-ui-text-title'>{count}</span>
          <button onClick={() => onCountChange(item.productId, count + 1)}>
            <LucideIcons.Plus size={16} />
          </button>
        </div>
      </div>

      <div className='flex flex-col justify-center gap-3 px-[50px]'>
        <Badge variant='linesuccess' className='w-fit'>
          새벽배송
        </Badge>

        <p className='text-body-16m text-ui-text-title'>배송비 : {item.delivery_price.toLocaleString()}원</p>
      </div>
    </li>
  );
}
