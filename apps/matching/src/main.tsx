import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@repo/ui';
import { ChatWebSocketProvider } from '@/contexts/ChatWebSocketContext';
import { NetworkGuardModal } from '@repo/ui';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@repo/ui';
import App from '@/App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <NetworkGuardModal />
          <ErrorBoundary fallback={<ErrorPage />}>
            <ChatWebSocketProvider>
              <App />
            </ChatWebSocketProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
);
