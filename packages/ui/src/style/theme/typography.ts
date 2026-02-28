export const typography = {
  fontFamily: 'Pretandard Variable',
  fontSize: {
    title1: '24px',
    title2: '22px',
    title3: '20px',
    title4: '18px',
    title5: '16px',
    body1: '16px',
    body2: '14px',
    body3: '13px',
    body4: '12px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: '140%',
  letterSpacing: '-2.5%',
} as const;

export type TypographyTypes = typeof typography;
