'use client';

import { css, RuleSet } from 'styled-components';

export const mobile = (styles: RuleSet<object>) => css`
  @media (max-width: 810px) {
    ${styles}
  }
`;
