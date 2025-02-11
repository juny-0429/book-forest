import type { ThemeConfig } from 'tailwindcss/types/config';

const headingTypography: ThemeConfig['fontSize'] = {
  'H1/56-r': ['56px', { lineHeight: '68px', fontWeight: '400' }],
  'H1/56-b': ['56px', { lineHeight: '68px', fontWeight: '700' }],

  'H2/48-r': ['48px', { lineHeight: '60px', fontWeight: '400' }],
  'H2/48-b': ['48px', { lineHeight: '60px', fontWeight: '700' }],

  'H3/40-r': ['40px', { lineHeight: '52px', fontWeight: '400' }],
  'H3/40-b': ['40px', { lineHeight: '52px', fontWeight: '700' }],

  'H4/32-r': ['32px', { lineHeight: '44px', fontWeight: '400' }],
  'H4/32-b': ['32px', { lineHeight: '44px', fontWeight: '700' }],

  'H5/24-r': ['24px', { lineHeight: '32px', fontWeight: '400' }],
  'H5/24-b': ['24px', { lineHeight: '32px', fontWeight: '700' }],

  'H6/20-r': ['20px', { lineHeight: '28px', fontWeight: '400' }],
  'H6/20-b': ['20px', { lineHeight: '28px', fontWeight: '700' }],
};

const titleTypography: ThemeConfig['fontSize'] = {
  'title-lg-r': ['24px', { lineHeight: '32px', fontWeight: '400' }],
  'title-lg-b': ['24px', { lineHeight: '32px', fontWeight: '700' }],

  'title-md-r': ['16px', { lineHeight: '22px', fontWeight: '400' }],
  'title-md-b': ['16px', { lineHeight: '22px', fontWeight: '700' }],

  'title-sm-r': ['14px', { lineHeight: '22px', fontWeight: '400' }],
  'title-sm-b': ['14px', { lineHeight: '22px', fontWeight: '700' }],
};

const bodyTypography: ThemeConfig['fontSize'] = {
  'body-16l': ['16px', { lineHeight: '24px', fontWeight: '300' }],
  'body-16r': ['16px', { lineHeight: '24px', fontWeight: '400' }],
  'body-16m': ['16px', { lineHeight: '24px', fontWeight: '500' }],
  'body-16b': ['16px', { lineHeight: '24px', fontWeight: '700' }],

  'body-14l': ['14px', { lineHeight: '20px', fontWeight: '300' }],
  'body-14r': ['14px', { lineHeight: '20px', fontWeight: '400' }],
  'body-14m': ['14px', { lineHeight: '20px', fontWeight: '500' }],
  'body-14b': ['14px', { lineHeight: '20px', fontWeight: '700' }],

  'body-12l': ['12px', { lineHeight: '16px', fontWeight: '300' }],
  'body-12r': ['12px', { lineHeight: '16px', fontWeight: '400' }],
  'body-12m': ['12px', { lineHeight: '16px', fontWeight: '500' }],
  'body-12b': ['12px', { lineHeight: '16px', fontWeight: '700' }],
};

const captionTypography: ThemeConfig['fontSize'] = {
  'caption-12r': ['12px', { lineHeight: '14px', fontWeight: '400' }],
  'caption-12b': ['12px', { lineHeight: '14px', fontWeight: '700' }],

  'caption-10r': ['10px', { lineHeight: '14px', fontWeight: '400' }],
  'caption-10b': ['10px', { lineHeight: '14px', fontWeight: '700' }],
};

const typography = {
  ...headingTypography,
  ...titleTypography,
  ...bodyTypography,
  ...captionTypography,
};

export default typography;
