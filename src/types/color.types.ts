const baseColors = ['green', 'lime', 'teal', 'red', 'saffron', 'blue', 'gray'] as const;
const stateColors = ['positive', 'informative', 'warning', 'delay'] as const;
const uiColors = ['main', 'cta'] as const;

export const colorList = [...baseColors, ...stateColors, ...uiColors] as const;
export type ColorType = (typeof colorList)[number];
