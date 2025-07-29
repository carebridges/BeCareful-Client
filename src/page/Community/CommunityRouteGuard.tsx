import { useCommunityAccess } from '@/api/communityAssociation';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { CommunityCreatePage } from '@/page/Community/CommunityCreatePage';
import CommunityPage from '@/page/Community/CommunityPage';

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
