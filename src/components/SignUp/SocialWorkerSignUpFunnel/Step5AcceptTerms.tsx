import { useSignUpContext } from '@/contexts/SocialWorkerSignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';
import { useCallback, useMemo, useState } from 'react';
import { CaregiverAgreeItem } from '@/components/SignUp/CareGiverSignUpFunnel/Step1BasicInfo/CaregiverAgreeItem';
import {
  CENTER_TERMS,
  MARKETING_TERMS,
  PRIVACY_TERMS,
} from '@/constants/termText';
import { useSocialWorkerSignupSubmit } from '@/hooks/SignUp/useSocialWorkerSignupSubmit';
import { SignUpPayload } from '@/types/SocialSignUp';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';

type AgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo';

export const Step5AcceptTerms = () => {
  const { goToNext, goToPrev, formData, setFormData } = useSignUpContext();
  const { submit, isPending, isError } = useSocialWorkerSignupSubmit();

  const agreeState = useMemo(
    () => ({
      isAgreedToTerms: formData.isAgreedToTerms,
      isAgreedToCollectPersonalInfo: formData.isAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo: formData.isAgreedToReceiveMarketingInfo,
    }),
    [formData],
  );

  const requiredAgreed =
    agreeState.isAgreedToTerms && agreeState.isAgreedToCollectPersonalInfo;

  const isAllAgreed =
    requiredAgreed && agreeState.isAgreedToReceiveMarketingInfo;

  const handleCheckboxChange = useCallback(
    (field: AgreeField) => (checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]: checked,
      }));
    },
    [setFormData],
  );

  const handleAgreeAll = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      isAgreedToTerms: !isAllAgreed,
      isAgreedToCollectPersonalInfo: !isAllAgreed,
      isAgreedToReceiveMarketingInfo: !isAllAgreed,
    }));
  }, [isAllAgreed, setFormData]);

  const [expandedState, setExpandedState] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const isAnyExpanded = Object.values(expandedState).some(Boolean);

  const handleNext = useCallback(() => {
    if (!requiredAgreed || isPending) return;
    submit(formData as SignUpPayload, { onSuccess: () => goToNext() });
  }, [requiredAgreed, isPending, formData, submit, goToNext]);

  return (
    <StepWrapper $isAnyExpanded={isAnyExpanded}>
      <HeaderSection>
        <Title>
          이용약관에 동의하시겠습니까?
          <span className="highlight"> *</span>
        </Title>
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
            checked={formData.isAgreedToTerms}
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
            checked={formData.isAgreedToCollectPersonalInfo}
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
            checked={formData.isAgreedToReceiveMarketingInfo}
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

      {isError && <ErrorIndicator />}

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" disabled={isPending}>
          이전
        </Button>
        <Button
          onClick={handleNext}
          height="52px"
          variant={requiredAgreed ? 'blue' : 'gray'}
          disabled={!requiredAgreed || isPending}
        >
          {isPending ? '처리 중...' : '다음'}
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div<{ $isAnyExpanded: boolean }>`
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

  background: ${({ theme }) => theme.colors.white};
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
