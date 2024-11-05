export const ColorPalette = {
  white: '#ffffff',
  darkBrown: '#4328103d',
  coalBlack: '#333333',
  blue: '#3362ab',
  blue_500: '#f0f5ff',
  gray: '#828282',
  gray_50: '#5C5C5C',
  gray_100: '#E0E0E0',
  gray_200: '#FAFAFA',
  gray_300: '#F5F5F5',
  gray_400: '#d1d5db',
  green: '#009900',
  red: '#f87171',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

export const fontFamily = {
  DmSans: 'DM Sans, sans-serif',
  DrukWide: 'Druk Wide',
  Inter: 'Inter, sans-serif',
  Roboto: 'Roboto',
} as const;

export const MobileBreakpoint = 768;

export const Breakpoint = {
  mobile: `@media(max-width: ${MobileBreakpoint}px)`,
};
