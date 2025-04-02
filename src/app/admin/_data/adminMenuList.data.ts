import { appRoutes } from 'src/routes/appRoutes';

const adminMenuList = {
  userManagement: {
    label: '회원관리',
    subMenu: [
      { label: '회원 조회/수정/탈퇴', path: appRoutes.admin.userManagement.list },
      { label: '등급 및 권한 설정', path: appRoutes.admin.userManagement.roles },
      { label: '관리자 목록 조회/수정/삭제', path: appRoutes.admin.userManagement.admins },
    ],
  },
  productManagement: {
    label: '상품관리',
    subMenu: [
      { label: '상품 목록', path: appRoutes.admin.productManagement.list },
      { label: '상품 등록', path: appRoutes.admin.productManagement.new },
      { label: '카테고리 관리', path: appRoutes.admin.productManagement.categories },
    ],
  },
  boardManagement: {
    label: '게시판관리',
    subMenu: [
      { label: '자주 묻는 질문 FAQ', path: appRoutes.admin.boardManagement.faq },
      { label: '1:1 문의', path: appRoutes.admin.boardManagement.inquiries },
    ],
  },
  contentManagement: {
    label: '콘텐츠관리',
    subMenu: [
      { label: '사이트 기본 설정', path: appRoutes.admin.contentManagement.siteSettings },
      { label: '이벤트 관리', path: appRoutes.admin.contentManagement.events },
      { label: '배너 관리', path: appRoutes.admin.contentManagement.banners },
    ],
  },
} as const;

export default adminMenuList;
