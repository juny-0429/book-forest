import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useWishlistItemCheck } from 'src/app/(main)/shop/wishlist/_hooks/react-query/useGetwishlistItemCheck';
import { useAuth } from 'src/provider/authProvider';
import LucideIcons from 'src/theme/lucideIcon';

interface BookHeaderProps {
  productId: number;
  productName: string;
  authorName: string;
  publisher: string;
  publishedDate: Date;
}

export default function BookHeader({ productId, productName, authorName, publisher, publishedDate }: BookHeaderProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { data: isWished } = useWishlistItemCheck(user?.id ?? '', productId);

  const onCopyUrl = async () => {
    const fullUrl = `${window.location.origin}${pathname}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert('주소가 복사되었습니다!');
    } catch (_error) {
      alert('주소 복사에 실패했어요.');
    }
  };

  return (
    <section className='mb-2 border-b border-solid border-gray-300'>
      <div className='flex justify-between items-center py-5'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-title-24b'>{productName}</h2>
          <div className='flex items-center gap-2'>
            <span className='text-body-16r text-ui-text-description'>{authorName} (지은이)</span>
            <hr className='w-[1px] h-[8px] bg-gray-600' />
            <span className='text-body-16r text-ui-text-description'>{publisher}</span>
            <hr className='w-[1px] h-[8px] bg-gray-600' />
            <time className='text-body-16r text-ui-text-description'>{dayjs(publishedDate).format('YYYY년 MM월 DD일')}</time>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {isWished ? <LucideIcons.Heart size={30} className='fill-red-500 text-red-500' /> : <LucideIcons.Heart size={30} />}
          <button onClick={onCopyUrl}>
            <LucideIcons.Share2 size={30} />
          </button>
        </div>
      </div>
    </section>
  );
}
