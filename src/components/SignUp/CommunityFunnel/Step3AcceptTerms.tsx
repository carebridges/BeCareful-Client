import { useRegisterAssociation } from '@/api/communityFunnel';
import { Button } from '@/components/common/Button/Button';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';
import { CaregiverAgreeItem } from '@/components/SignUp/CareGiverSignUpFunnel/Step1BasicInfo/CaregiverAgreeItem';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';

import {
  CENTER_TERMS,
  PRIVACY_TERMS,
  MARKETING_TERMS,
} from '@/constants/termText';
import { useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

interface StepProps {
  goToNext: () => void;
  onCancel?: () => void;
  communityFormData: CommunityFormData;
  setCommunityFormData: React.Dispatch<React.SetStateAction<CommunityFormData>>;
}

type CommunityAgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo'; // TODO 임시로 갖다놓음

export const Step3AcceptTerms = ({
  goToNext,
  onCancel,
  communityFormData,
  setCommunityFormData,
}: StepProps) => {
  const { mutate: registerAssociation } = useRegisterAssociation();

  const agreeState = useMemo(
    () => ({
      isAgreedToTerms: communityFormData.isAgreedToTerms,
      isAgreedToCollectPersonalInfo:
        communityFormData.isAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo:
        communityFormData.isAgreedToReceiveMarketingInfo,
    }),
    [communityFormData],
  );

  const requiredAgreed =
    agreeState.isAgreedToTerms && agreeState.isAgreedToCollectPersonalInfo;

  const isAllAgreed =
    requiredAgreed && agreeState.isAgreedToReceiveMarketingInfo;

  const handleCheckboxChange = useCallback(
    (field: CommunityAgreeField) => (checked: boolean) => {
      setCommunityFormData((prev) => ({
        ...prev,
        [field]: checked,
      }));
    },
    [setCommunityFormData],
  );

  const [, setExpandedState] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAgreeAll = useCallback(() => {
    setCommunityFormData((prev) => ({
      ...prev,
      isAgreedToTerms: !isAllAgreed,
      isAgreedToCollectPersonalInfo: !isAllAgreed,
      isAgreedToReceiveMarketingInfo: !isAllAgreed,
    }));
  }, [isAllAgreed, setCommunityFormData]);

  const handleNext = useCallback(() => {
    if (!requiredAgreed) return;
    registerAssociation(communityFormData, {
      onSuccess: () => goToNext(),
      onError: () => {
        alert('커뮤니티 생성에 실패했어요. 다시 시도해 주세요.');
      },
    });
  }, [requiredAgreed, communityFormData, registerAssociation, goToNext]);

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          이용약관에 동의하시겠습니까?<span className="highlight"> *</span>
        </Title>
        <SubText>필수 약관 동의 후 커뮤니티를 생성합니다.</SubText>
      </HeaderSection>

      <AgreeWrapper>
        <AgreeCard
          pressed={isAllAgreed}
          text="전체 동의"
          onClick={handleAgreeAll}
        />

        <AgreeCheckContainer>
          <CaregiverAgreeItem
            id="1"
            checked={communityFormData.isAgreedToTerms}
            onChange={handleCheckboxChange('isAgreedToTerms')}
            select="필수"
            guide="이용약관"
            content={CENTER_TERMS}
            onToggle={(v) =>
              setExpandedState((prev) => ({ ...prev, terms: v }))
            }
          />

          <CaregiverAgreeItem
            id="2"
            checked={communityFormData.isAgreedToCollectPersonalInfo}
            onChange={handleCheckboxChange('isAgreedToCollectPersonalInfo')}
            select="필수"
            guide="개인정보 수집 및 이용 동의"
            content={PRIVACY_TERMS}
            onToggle={(v) =>
              setExpandedState((prev) => ({ ...prev, privacy: v }))
            }
          />

          <CaregiverAgreeItem
            id="3"
            checked={communityFormData.isAgreedToReceiveMarketingInfo}
            onChange={handleCheckboxChange('isAgreedToReceiveMarketingInfo')}
            select="선택"
            guide="마케팅 정보 수신 동의"
            content={MARKETING_TERMS}
            onToggle={(v) =>
              setExpandedState((prev) => ({ ...prev, marketing: v }))
            }
          />
        </AgreeCheckContainer>
      </AgreeWrapper>

      <ButtonContainer>
        <Button onClick={onCancel} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={handleNext}
          height="52px"
          variant={requiredAgreed ? 'blue' : 'gray'}
          disabled={!requiredAgreed}
        >
          커뮤니티 생성하기
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 112px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
`;

const AgreeWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
`;

const AgreeCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
