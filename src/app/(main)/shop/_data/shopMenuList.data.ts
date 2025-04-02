import { appRoutes } from 'src/routes/appRoutes';

const shopMenuList = {
  shoppingHistory: {
    label: '쇼핑내역',
    subMenu: [
      { label: '주문 조회/변경/취소', path: appRoutes.shop.shoppingHistory.orders },
      { label: '반품/교환 내역', path: appRoutes.shop.shoppingHistory.returns },
      { label: '선물함', path: appRoutes.shop.shoppingHistory.giftbox },
      { label: '찜하기', path: appRoutes.shop.shoppingHistory.wishlist },
      { label: '전자영수증 내역', path: appRoutes.shop.shoppingHistory.receipts },
    ],
  },
  userInfo: {
    label: '회원정보',
    subMenu: [
      { label: '회원정보 수정', path: appRoutes.account.auth.profile },
      { label: '마케팅 수신 설정', path: appRoutes.account.auth.marketingPreferences },
      { label: '배송지 목록', path: appRoutes.account.auth.addresses },
      { label: '마일리지 관리', path: appRoutes.account.auth.mileage },
      { label: '회원탈퇴', path: appRoutes.account.auth.deleteAccount },
    ],
  },
  helpCenter: {
    label: '고객센터',
    subMenu: [
      { label: '자주 묻는 질문 FAQ', path: appRoutes.shop.customerSupport.helpFaq },
      { label: '1:1 문의', path: appRoutes.shop.customerSupport.helpContact },
    ],
  },
  alerts: {
    label: '알림센터',
    subMenu: [
      { label: '알림함', path: appRoutes.shop.notifications.notificationList },
      { label: '알림 설정', path: appRoutes.shop.notifications.notificationSettings },
    ],
  },
} as const;

export default shopMenuList;
