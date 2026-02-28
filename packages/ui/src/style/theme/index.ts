import { colors } from './color';
import { typography } from './typography';

export const theme = {
  colors,
  typography,
} as const;

export type ThemeType = typeof theme;

export * from './color';
export * from './typography';
