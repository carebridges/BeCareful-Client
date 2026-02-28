'use client';

import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { SplashPage } from '@repo/ui';

export default function Page() {
  const { handleNavigate } = useHandleNavigate();

  return <SplashPage onComplete={() => handleNavigate('/onboarding')} />;
}
