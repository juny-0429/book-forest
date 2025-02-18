export const appRoutes = {
  home: '/', // 홈
  login: '/login', // 로그인
  signup: '/signup', // 회원가입
  category: '/category', // 카테고리
  newArrivals: '/newArrivals', // 신상품
  bestsellers: '/bestsellers', // 베스트
  picks: 'picks',
  board: {
    event: '/board/event', // 이벤트 게시판
    notice: '/board/notice', // 공지사항 게시판
    qna: '/board/qna', // Q&A 게시판
  },
  payment: '/payment', // 결제
  myPage: '/mypage', // 마이
  cart: 'cart', // 카드
  admin: '/admin', // 관리자
} as const;
