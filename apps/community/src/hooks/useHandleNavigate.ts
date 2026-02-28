'use client';

import { useRouter } from 'next/navigation';

export const useHandleNavigate = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
    window.scrollTo(0, 0);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    window.scrollTo(0, 0);
  };

  return { handleGoBack, handleNavigate };
};
