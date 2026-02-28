'use client';

import { useCommunityAccess } from '@/api/community';
import { CommunityCreatePage } from '@/page/CommunityCreatePage';
import CommunityPage from '@/page/CommunityPage';
import { LoadingIndicator } from '@repo/ui';

export const CommunityRouteGuard = () => {
  const { data, isLoading, isError } = useCommunityAccess();

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <CommunityCreatePage />;

  const allowed = ['ALREADY_APPROVED', 'APPROVED', 'PENDING'] as const;

  return allowed.includes(data.accessStatus as (typeof allowed)[number]) ? (
    <CommunityPage />
  ) : (
    <CommunityCreatePage />
  );
};
