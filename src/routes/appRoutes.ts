export const appRoutes = {
  /* 홈 */
  home: '/',
  /* 로그인 */
  login: '/login',

  account: {
    /* 아이디 찾기 */
    forgotId: '/account/forgot-id',
    /* 아이디 찾기 결과 */
    forgotIdResult: '/account/forgot-id/result',
    /* 비밀번호 재설정 */
    resetPassword: '/account/reset-password',

    auth: {
      /* 비밀번호 재설정 */
      resetPassword: '/account/auth/reset-password',
      /* 회원정보 수정 */
      profile: '/account/auth/profile',
      /* 마케팅 수신 설정 */
      marketingPreferences: '/account/auth/marketing-preferences',
      /* 배송지 목록 */
      addresses: '/account/auth/addresses',
      /* 마일리지 관리 */
      mileage: '/account/auth/mileage',
      /* 회원탈퇴 */
      deleteAccount: '/account/auth/delete',
    },
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
  /* 상품 상세페이지 */
  productDetail: '/detail',

  board: {
    /* 이벤트 게시판 */
    event: '/board/event',
    /* 공지사항 게시판 */
    notice: '/board/notice',
    /* Q&A 게시판 */
    qna: '/board/qna',
    /* 게시글 쓰기 */
    write: '/board/write',
  },

  /* 결제 */
  payment: '/payment',
  /* 장바구니 */
  cart: '/cart',

  /* 관리자 */
  admin: {
    main: '/admin',

    /* 회원 관리 */
    userManagement: {
      list: '/admin/user-management',
      roles: '/admin/user-management/roles',
      admins: '/admin/user-management/admins',
    },

    /* 상품 관리 */
    productManagement: {
      list: '/admin/products?page=1',
      new: '/admin/products/new',
      categories: '/admin/categories',
    },

    /* 게시판 관리 */
    boardManagement: {
      faq: '/admin/board/faq',
      inquiries: '/admin/board/inquiries',
    },

    /* 콘텐츠 관리 */
    contentManagement: {
      siteSettings: '/admin/content/site-settings',
      events: '/admin/content/events',
      banners: '/admin/banners',
    },
  },

  /* 마이페이지 */
  shop: {
    main: '/shop/main',

    /* 쇼핑 내역 */
    shoppingHistory: {
      /* 주문 조회/변경/취소 */
      orders: '/shop/orders',
      /* 반품/교환 내역 */
      returns: '/shop/returns',
      /* 선물함 */
      giftbox: '/shop/giftbox',
      /* 찜 목록 */
      wishlist: '/shop/wishlist',
      /* 전자 영수증 내역 */
      receipts: '/shop/receipts',
    },

    /* 고객센터 */
    customerSupport: {
      /* 자주 묻는 질문 */
      helpFaq: '/board/qna',
      /* 1:1 문의 */
      helpContact: '/shop/help/contact',
    },

    /* 알림센터 */
    notifications: {
      /* 알림함 */
      notificationList: '/shop/notifications',
      /* 알림 설정 */
      notificationSettings: '/shop/notifications/settings',
    },
  },

  policies: {
    /* 회사소개 */
    companyInfo: '/company',
    /* 이용약관 */
    termsOfService: '/terms-of-service',
    /* 개인정보처리방침 */
    privacyPolicy: '/privacy',
    /* 청소년보호정책 */
    youthProtection: '/youth-protection',
    /* 개인정보 마케팅 활용 동의 */
    marketingConsent: '/marketing-consent',
  },

  /* 채용정보 */
  careers: '/careers',
  /* 학교기업기관 대량구매 */
  bulkPurchase: '/bulk-purchase',
} as const;
