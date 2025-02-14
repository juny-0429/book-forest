export const animations = {
  keyframes: {
    'slide-top': {
      '0%': { transform: 'translateY(100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    'slide-right': {
      '0%': { transform: 'translateX(0)', opacity: '1' },
      '100%': { transform: 'translateX(100%)', opacity: '0' },
    },
  },
  animation: {
    'slide-top': 'slide-top 0.5s ease-out',
    'slide-right': 'slide-right 0.5s ease-out',
  },
};