export const colors = {
  mainBlue: '#0370ff',
  mainOrange: '#ff4c14',
  mainGreen: '#0d8a23',
  subBlue: '#f0f5ff',
  subOrange: '#fff7f6',
  subGreen: '#F4FFF6',
  gray50: '#f2f2f2',
  gray100: '#d9d9d9',
  gray200: '#bfbfbf',
  gray300: '#a6a6a6',
  gray400: '#8c8c8c',
  gray500: '#737373',
  gray600: '#595959',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#0d0d0d',
  positive: '#12bd45',
  negative: '#ff3d00',
  white: '#ffffff',
  black: '#000000',
} as const;

export type ColorTypes = typeof colors;
