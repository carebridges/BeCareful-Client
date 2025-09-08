import styled from 'styled-components';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';
import { AGREE_ITEMS } from '@/constants/signUpAgreeItems';
import { useState, useCallback, useMemo } from 'react';
import { AgreeField, AgreementValues } from '@/types/Socialworker/common';
import { CaregiverAgreeItem } from '@/components/SignUp/CareGiverSignUpFunnel/Step1BasicInfo/CaregiverAgreeItem';

interface AgreementSectionProps {
  initialIsAgreedToTerms: boolean;
  initialIsAgreedToCollectPersonalInfo: boolean;
  initialIsAgreedToReceiveMarketingInfo: boolean;
  onAgreementChange: (agreements: AgreementValues) => void;
}

const AgreeSection = ({
  initialIsAgreedToTerms,
  initialIsAgreedToCollectPersonalInfo,
  initialIsAgreedToReceiveMarketingInfo,
  onAgreementChange,
}: AgreementSectionProps) => {
  const agreements = useMemo(
    () => ({
      isAgreedToTerms: initialIsAgreedToTerms,
      isAgreedToCollectPersonalInfo: initialIsAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo: initialIsAgreedToReceiveMarketingInfo,
    }),
    [
      initialIsAgreedToTerms,
      initialIsAgreedToCollectPersonalInfo,
      initialIsAgreedToReceiveMarketingInfo,
    ],
  );

  const isAllAgreed = Object.values(agreements).every(Boolean);

  // 전체 동의/해제 핸들러: 변경된 전체 상태를 부모에게 전달합니다.
  const handleAgreeAll = useCallback(() => {
    const newValue = !isAllAgreed;
    onAgreementChange({
      isAgreedToTerms: newValue,
      isAgreedToCollectPersonalInfo: newValue,
      isAgreedToReceiveMarketingInfo: newValue,
    });
  }, [isAllAgreed, onAgreementChange]);

  // 개별 체크박스 변경 핸들러: 변경된 개별 상태를 포함한 전체 상태를 부모에게 전달합니다.
  const handleCheckboxChange = useCallback(
    (field: AgreeField) => (checked: boolean) => {
      const updatedAgreements = {
        ...agreements,
        [field]: checked,
      };
      onAgreementChange(updatedAgreements);
    },
    [agreements, onAgreementChange],
  );

  const [, setExpandedState] = useState({
    isAgreedToTerms: false,
    isAgreedToCollectPersonalInfo: false,
    isAgreedToReceiveMarketingInfo: false,
  });

  return (
    <CardContainer>
      <label className="title">
        약관동의 <span className="star">*</span>
      </label>
      <AgreeCard
        pressed={isAllAgreed}
        text="전체 동의"
        onClick={handleAgreeAll}
      />
      <AgreeCheckContainer>
        {AGREE_ITEMS.map(({ key, id, select, guide, content }) => (
          <CaregiverAgreeItem
            key={id}
            id={id}
            checked={agreements[key]}
            onChange={handleCheckboxChange(key)}
            select={select}
            guide={guide}
            content={content}
            onToggle={(v) =>
              setExpandedState((prev) => ({ ...prev, [key]: v }))
            }
          />
        ))}
      </AgreeCheckContainer>
    </CardContainer>
  );
};

export default AgreeSection;

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .star {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const AgreeCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
