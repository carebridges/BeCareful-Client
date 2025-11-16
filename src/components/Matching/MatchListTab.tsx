import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { TabContentMatching } from '@/components/Matching/TabContentMatching';
import { MatchingCaregiver } from '@/types/Matching.socialWorker';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface MatchListTabProps {
  recruitmentId: number;
  caregivers: MatchingCaregiver[];
}

export const MatchListTab = ({
  recruitmentId,
  caregivers,
}: MatchListTabProps) => {
  const navigate = useNavigate();

  if (caregivers.length === 0) {
    return <EmptyStateIndicator message="매칭된 요양보호사가 없습니다." />;
  }
  return (
    <Container>
      {caregivers.map((caregiver, index) => (
        <TabContentMatching
          key={index}
          matchingScore={
            caregiver.matchingResultStatus as '높음' | '보통' | '낮음'
          }
          profileImageUrl={caregiver.caregiverInfo.profileImageUrl}
          caregiverName={caregiver.caregiverInfo.name}
          careerTitle={caregiver.caregiverInfo.applicationTitle}
          onClick={() =>
            navigate(
              `/socialworker/matching/${recruitmentId}/caregiver/${caregiver.caregiverInfo.caregiverId}`,
            )
          }
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
