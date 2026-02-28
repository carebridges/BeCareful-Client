'use client';

import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@repo/ui';
import { useState } from 'react';
import { PostReadStatusProvider } from '@/contexts/PostReadStatusContext';
import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="ko">
      <body>
        {/* 1. 카카오 SDK 로드 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />

        {/* 2. 브라우저 체크 스크립트 */}
        <Script id="browser-check">
          {`
            const userAgent = navigator.userAgent;
            if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
              document.body.classList.add('is-chrome');
            } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
              document.body.classList.add('is-safari');
            }
          `}
        </Script>

        <StyledComponentsRegistry>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <PostReadStatusProvider>{children}</PostReadStatusProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </RecoilRoot>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
