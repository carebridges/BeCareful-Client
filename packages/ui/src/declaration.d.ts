/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
  import React from 'react';

  export const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { onClick?: any; [key: string]: any }
  >;
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.otf' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}
