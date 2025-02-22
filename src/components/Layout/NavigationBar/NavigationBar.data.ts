import { appRoutes } from 'src/routes/appRoutes';

export const mockNavigationList = [
  {
    label: '쇼핑홈',
    url: appRoutes.home,
    isActive: true,
  },
  {
    label: '카테고리',
    url: appRoutes.category.category,
    isActive: true,
  },
  {
    label: '신상품',
    url: appRoutes.newArrivals,
    isActive: true,
  },
  {
    label: '베스트',
    url: appRoutes.bestsellers,
    isActive: true,
  },
  {
    label: 'PICKS',
    url: appRoutes.picks,
    isActive: true,
  },
  {
    label: '공지사항',
    url: appRoutes.board.notice,
    isActive: true,
  },
  {
    label: '이벤트',
    url: appRoutes.board.event,
    isActive: true,
  },
];
