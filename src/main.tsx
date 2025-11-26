import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyle from '@/style/GlobalStyle';
import App from '@/App';
import { ErrorPage } from '@/page/Error/ErrorPage';
import { theme } from '@/style/theme/index';
import { NetworkGuardModal } from '@/components/common/NetworkGuard/NetworkGuardModal';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <NetworkGuardModal />
          <ErrorBoundary fallback={<ErrorPage />}>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
);
