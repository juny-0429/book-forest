export const appRoutes = {
  /* 홈 */
  home: '/',
  /* 로그인 */
  login: '/login',

  account: {
    /* 아이디 찾기 */
    forgotId: '/account/forgot-id',
    /* 비밀번호 찾기 */
    forgotPassword: '/account/forgot-password',
    /* 아이디 찾기 결과 */
    findId: '/account/fid-id',
    /* 비밀번호 재설정 */
    resetPassword: '/account/reset-password',
  },

  /* 회원가입 */
  signup: '/signup',
  /* 카테고리 */
  category: '/category',
  /* 신상품 */
  newArrivals: '/newArrivals',
  /* 베스트 */
  bestsellers: '/bestsellers',
  /* PICKS */
  picks: '/picks',

  board: {
    /* 이벤트 게시판 */
    event: '/board/event',
    /* 공지사항 게시판 */
    notice: '/board/notice',
    /* Q&A 게시판 */
    qna: '/board/qna',
  },

  /* 결제 */
  payment: '/payment',
  /* 마이페이지 */
  myPage: '/mypage',
  /* 장바구니 */
  cart: '/cart',
  /* 관리자 */
  admin: '/admin',

  policies: {
    /* 회사소개 */
    companyInfo: '/company',
    /* 이용약관 */
    termsOfService: '/terms',
    /* 개인정보처리방침 */
    privacyPolicy: '/privacy',
    /* 청소년보호정책 */
    youthProtection: '/youth-protection',
  },

  /* 채용정보 */
  careers: '/careers',
  /* 학교기업기관 대량구매 */
  bulkPurchase: '/bulk-purchase',
} as const;
