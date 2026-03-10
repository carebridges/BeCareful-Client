import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { CaregiverProfileContent } from '@/components/ProfileView/CaregiverProfileContent';
import { InstitutionProfileContent } from '@/components/ProfileView/InstitutionProfileContent';
import { useLocation, useParams } from 'react-router-dom';

type ProfileLocationState = {
  chatRoomId?: number;
};

export const ProfileViewPage = () => {
  const { type, id } = useParams<{
    type: 'institution' | 'caregiver';
    id: string;
  }>();
  const location = useLocation();
  const state = location.state as ProfileLocationState | null;

  if (!type || !id) {
    return <EmptyStateIndicator message="잘못된 접근입니다." />;
  }

  if (type === 'caregiver') {
    return <CaregiverProfileContent id={id} chatRoomId={state?.chatRoomId} />;
  }

  if (type === 'institution') {
    return <InstitutionProfileContent id={id} chatRoomId={state?.chatRoomId} />;
  }

  return <EmptyStateIndicator message="잘못된 접근입니다." />;
};
