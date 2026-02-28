'use client';

export const dynamic = 'force-dynamic';

import { ErrorPage } from '@repo/ui';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    router.back();

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return <ErrorPage onBack={handleBack} />;
}
