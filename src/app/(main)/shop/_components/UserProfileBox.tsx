import Image from 'next/image';
import LucideIcons from 'src/theme/lucideIcon';
import IconButton from 'src/components/Button/IconButton';
import Link from 'next/link';
import { appRoutes } from 'src/routes/appRoutes';
import DefaultProfileImg from '@/assets/images/default_profile.png';
import { useGetUserProfile } from '../_hooks/react-query/useGetUserProfile';
import { useCustomModal } from 'src/hooks/useModal';
import UserProfileCropContent from './UserProfileCropContent';
import { useCartCountByUserId } from '../../cart/_hooks/react-query/useGetCartCountByUserId';
import { useAuth } from 'src/provider/authProvider';
import { useWishListCountByUserId } from '../wishlist/_hooks/react-query/useGetWishListByUserId';

export default function UserProfileBox() {
  const { openCustomModal } = useCustomModal();
  const { data: userInfo } = useGetUserProfile();
  const { user } = useAuth();
  const { data: cartCount } = useCartCountByUserId(user?.id ?? '');
  const { data: wishlistCount } = useWishListCountByUserId(user?.id ?? '');

  const profileImageSrc = userInfo?.userProfileImageUrl || DefaultProfileImg;

  const openProfileCropModal = () => {
    openCustomModal({
      children: <UserProfileCropContent />,
    });
  };

  return (
    <section className='flex flex-col items-center gap-4 px-5 py-4 border border-solid border-gray-300 rounded-[6px]'>
      <figure className='relative'>
        <div className='relative w-[100px] h-[100px] rounded-full overflow-hidden'>
          {profileImageSrc && <Image src={userInfo?.userProfileImageUrl || DefaultProfileImg} alt='user profile' fill sizes='100px' className='object-cover' />}
        </div>

        <button onClick={openProfileCropModal} className='absolute bottom-0 right-0 flex justify-center items-center w-7 h-7 bg-gray-600 rounded-full'>
          <LucideIcons.Camera size={16} className='text-white' />
        </button>
      </figure>

      <div className='flex justify-between items-center w-full'>
        <p className='text-body-16b text-ui-text-title'>{userInfo?.accountId}</p>

        <IconButton height={24}>
          <LucideIcons.Settings size={16} strokeWidth={1} className='text-gray-900' />
        </IconButton>
      </div>

      <hr className='w-full h-[1px] bg-slate-300' />

      {/* 바로가기 메뉴 */}
      <nav className='mt-4' aria-label='사용자 바로가기 메뉴'>
        <ul className='flex justify-around gap-4'>
          <li>
            <Link href={appRoutes.cart} className='flex flex-col items-center gap-1'>
              <LucideIcons.ShoppingCart size={24} />
              <p className='text-body-16m text-ui-text-title'>카트</p>
              <p className='text-body-18m text-ui-text-body'>{cartCount}</p>
            </Link>
          </li>

          <li>
            <Link href={appRoutes.shop.shoppingHistory.wishlist} className='flex flex-col items-center gap-1'>
              <LucideIcons.Heart size={24} />
              <p className='text-body-16m text-ui-text-title'>찜하기</p>
              <p className='text-body-18m text-ui-text-body'>{wishlistCount}</p>
            </Link>
          </li>

          <li>
            <Link href='#' className='flex flex-col items-center gap-1'>
              <LucideIcons.Ticket size={24} />
              <p className='text-body-16m text-ui-text-title'>쿠폰</p>
              <p className='text-body-18m text-ui-text-body'>5</p>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
