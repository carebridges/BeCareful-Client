import { useMatchingRecruitment } from '@/api/matching.socialWorker';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';

import { MatchingElderInfo } from '@/components/Matching/MatchingElderInfo';
import { MatchingTab } from '@/components/Matching/Modal/MatchingTab';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export const MatchingInfoPage = () => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const {
    data: elderData,
    isLoading,
    isError,
  } = useMatchingRecruitment(recruitmentId ?? '');

  if (isLoading) return <LoadingIndicator />;
  if (isError || !elderData) return <ErrorIndicator />;

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate(-1)}>
          <IconArrowLeft />
        </IconContainer>
        매칭 정보
        <HideIconContainer />
      </TopContainer>

      <MatchingElderInfo data={elderData} />
      <GapContainer />
      <TabContainer>
        <MatchingTab
          recruitmentId={Number(recruitmentId)}
          matchedCaregivers={elderData.matchedCaregivers}
          appliedCaregivers={elderData.appliedCaregivers}
        />
      </TabContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const HideIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const TabContainer = styled.div`
  display: flex;
  padding: 16px 20px 20px 20px;
  box-sizing: border-box;
  width: 100%;
`;
