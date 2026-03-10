import { useCaregiverProfileView } from '@/api/matching/caregiver';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { formatCaregiverInfo } from '@/components/ProfileView/formatCaregiverInfo';
import { formatProfileDate } from '@/components/ProfileView/formatProfileDate';
import { ProfileLayout } from '@/components/ProfileView/ProfileLayout';

type CaregiverProfileContentProps = {
  id: string;
  chatRoomId?: number;
};

export const CaregiverProfileContent = ({
  id,
  chatRoomId,
}: CaregiverProfileContentProps) => {
  const { data, isLoading, isError } = useCaregiverProfileView(id);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError || !data) {
    return <ErrorIndicator />;
  }

  return (
    <ProfileLayout
      profileType="caregiver"
      joinedDateText={formatProfileDate(data.caregiverSignUpDate)}
      name={data.caregiverName}
      profileImageUrl={data.caregiverProfileImageUrl ?? ''}
      infoText={formatCaregiverInfo(data.caregiverAge, data.caregiverGender)}
      targetId={data.caregiverId}
      chatRoomId={chatRoomId}
      isBlocked={false}
    />
  );
};
