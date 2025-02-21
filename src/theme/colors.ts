const baseColors = {
  green: {
    50: '#E5FCE3',
    100: '#A5F4A0',
    200: '#6AD799',
    300: '#3AC890',
    400: '#2CA474',
    500: '#249C6C',
    600: '#1A6E4C',
    700: '#20524E',
    800: '#1A3B2E',
    900: '#12221B',
  },
  lime: {
    50: '#F7FEEB',
    100: '#F0F7D7',
    200: '#E1EFB0',
    300: '#D3E889',
    400: '#C4E062',
    500: '#B6D93B',
    600: '#91AD2F',
    700: '#7F9729',
    800: '#6D8223',
    900: '#5B6C1D',
  },
  teal: {
    50: '#EAF9FA',
    100: '#D1F5F8',
    200: '#B8F0F6',
    300: '#89E5EE',
    400: '#62D4E2',
    500: '#43BED0',
    600: '#2DA2B8',
    700: '#1D7F97',
    800: '#125A6F',
    900: '#0A3545',
  },
  red: {
    50: '#FFF5F5',
    100: '#FFDADB',
    200: '#FFBFBF',
    300: '#FF8585',
    400: '#FF5454',
    500: '#EF2B2A',
    600: '#DA120D',
    700: '#BF0A03',
    800: '#9F0A01',
    900: '#7D0800',
  },
  saffron: {
    50: '#FDF5E4',
    100: '#FCEED4',
    200: '#F9E5BC',
    300: '#F7CF9C',
    400: '#F5897C',
    500: '#F2A25C',
    600: '#BD794C',
    700: '#A7673C',
    800: '#91562C',
    900: '#7A441C',
  },
  blue: {
    50: '#E5E7EE',
    100: '#CCCFFD',
    200: '#999FBC',
    300: '#676F9B',
    400: '#343F7A',
    500: '#020F59',
    600: '#010C47',
    700: '#010A3E',
    800: '#010935',
    900: '#01072C',
  },
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#222222',
  },
};

const stateColors = {
  success: baseColors.green[500], // 쿠폰, 사은품 혜택 안내 및 활성화 텍스트
  informative: baseColors.blue[400], // 별점, 공식 태그 등 신뢰 색상
  error: baseColors.red[600], // 취소, 탈퇴 등 에러 색상
  warning: baseColors.saffron[500], // 배송 지연, 주의 관련 색상
};

const uiColors = {
  main: baseColors.green[700], // 브랜드 대표 색상
  cta: baseColors.green[500], // 버튼, 벳지 등 구매 주요 동선 색상
  'cta-hover': baseColors.green[600],
  text: {
    title: baseColors.gray[900], // 제목 색상
    body: baseColors.gray[800], // 서브 타이틀 및 강조
    description: baseColors.gray[600], // 설명 및 비활성화
    caption: baseColors.gray[300], // 약관이나 설명글
    cto: baseColors.green[700], // 상품명 및 할인 안내
  },
  background: baseColors.gray[50], // 페이지 배경 색상
};

const colors = {
  ...baseColors,
  state: stateColors,
  ui: uiColors,
};

export default colors;
