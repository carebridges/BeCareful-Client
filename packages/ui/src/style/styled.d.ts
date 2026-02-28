import 'styled-components';
import { TypographyTypes } from './theme/typography';
import { ColorTypes } from './theme/color';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTypes;
    typography: TypographyTypes;
  }
}
