import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { CaregiverBasicInfoSection } from '@/components/SocialWorker/MatchingCaregiverDetailInfo/CaregiverBasicInfoSection';
import { WorkPreferenceSection } from '@/components/SocialWorker/MatchingCaregiverDetailInfo/WorkPreferenceSection';
import { CareerSection } from '@/components/SocialWorker/MatchingCaregiverDetailInfo/CareerSection';
import { MATCH_REASON_TEXT } from '@/constants/matching.socialWorker';
import { useCaregiverDetail } from '@/api/matching.socialWorker';
import { Button } from '@/components/common/Button/Button';
import { SelectStartDateModal } from '@/components/SocialWorker/MatchingCaregiverDetailInfo/SelectStartDateModal';
import { useState } from 'react';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';

export const CareGiverDetailInfoPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { recruitmentId, caregiverId } = useParams<{
    recruitmentId: string;
    caregiverId: string;
  }>();

  const { data, isLoading, error } = useCaregiverDetail(
    recruitmentId ?? '',
    caregiverId ?? '',
  );

  if (!recruitmentId || !caregiverId) {
    return <EmptyStateIndicator message="잘못된 접근입니다." />;
  }

  if (isLoading) return <LoadingIndicator />;
  if (error || !data) return <ErrorIndicator />;

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate(-1)}>
          <IconArrowLeft />
        </IconContainer>
        요양보호사 정보
        <HideIconContainer />
      </TopContainer>

      <ProfileInfoContainer>
        <ProfileImage
          src={data.caregiverInfo.profileImageUrl || '/default-profile.png'}
        />
        <RightContainer>
          <ProfileInfo>
            <span className="highlight">{data.caregiverInfo.name}</span>
            <span>믿고 맡길 수 있는 편안함을 제공합니다.</span>
          </ProfileInfo>
          <TagContainer>적합도 {data.matchingResultStatus}</TagContainer>
        </RightContainer>
      </ProfileInfoContainer>

      <MatchReasonContainer>
        {Object.entries(MATCH_REASON_TEXT).map(([key, text]) =>
          data[key as keyof typeof MATCH_REASON_TEXT] === 'MATCHED_ALL' ? (
            <p key={key}>• {text}</p>
          ) : null,
        )}
      </MatchReasonContainer>

      <ContentContainer>
        <CaregiverBasicInfoSection data={data.caregiverInfo} />
      </ContentContainer>

      <GapContainer />
      <ContentContainer>
        <WorkPreferenceSection data={data.workApplicationInfo} />
      </ContentContainer>
      <GapContainer />
      <ContentContainer>
        <CareerSection careerInfo={data.careerInfo} />
      </ContentContainer>

      <ButtonContainer>
        <Button onClick={() => setIsModalOpen(true)} height="52px">
          채용제안하기
        </Button>
      </ButtonContainer>
      {isModalOpen && (
        <SelectStartDateModal
          width="400px"
          onClose={() => setIsModalOpen(false)}
          onCancel={() => {
            // TODO
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 134px;
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

const ProfileInfoContainer = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  gap: 12px;
  width: 100%;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .highlight {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const ProfileImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RightContainer = styled.div`
  display: flex;
  padding-top: 2px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const TagContainer = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.gray500};

  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const GapContainer = styled.div`
  display: flex;
  height: 6px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

const MatchReasonContainer = styled.div`
  display: flex;
  padding: 0px 20px 20px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
