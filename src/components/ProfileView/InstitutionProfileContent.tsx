import { useSocialWorkerProfileView } from '@/api/matching/socialworker';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { formatProfileDate } from '@/components/ProfileView/formatProfileDate';
import { ProfileLayout } from '@/components/ProfileView/ProfileLayout';

type InstitutionProfileContentProps = {
  id: string;
  chatRoomId?: number;
};

export const InstitutionProfileContent = ({
  id,
  chatRoomId,
}: InstitutionProfileContentProps) => {
  const { data, isLoading, isError } = useSocialWorkerProfileView(id);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError || !data) {
    return <ErrorIndicator />;
  }

  return (
    <ProfileLayout
      profileType="institution"
      joinedDateText={formatProfileDate(data.socialWorkerSignUpDate)}
      name={data.socialWorkerName}
      profileImageUrl={data.socialWorkerProfileImage ?? ''}
      infoText={data.institutionInfo?.name ?? ''}
      targetId={data.socialWorkerId}
      chatRoomId={chatRoomId}
      isBlocked={false}
    />
  );
};
