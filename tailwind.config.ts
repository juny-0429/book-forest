import type { Config } from 'tailwindcss';
import colors from './src/theme/colors';
import typography from './src/theme/typography';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard'], // 기본 폰트 Pretendard
        gyeonggiBatang: ['GyeonggiBatang', 'serif'], // 경기천년바탕 폰트
        gyeonggiTitle: ['GyeonggiJeTitle', 'sans-serif'], // 경기천년제목 폰트
      },
      colors: { ...colors },
      fontSize: { ...typography },
    },
  },
  plugins: [],
} satisfies Config;
