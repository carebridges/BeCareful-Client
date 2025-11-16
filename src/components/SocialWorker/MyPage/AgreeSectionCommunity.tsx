import styled from 'styled-components';
import { useState } from 'react';
import { CaregiverAgreeItem } from '@/components/SignUp/CareGiverSignUpFunnel/Step1BasicInfo/CaregiverAgreeItem';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';
import { COMMUNITY_AGREE_ITEMS } from '@/constants/signUpAgreeItems';
import { CommunityAgreeField } from '@/types/Socialworker/common';
import { CommunityAgreement } from '@/types/Socialworker/mypage';

interface AgreementSectionProps {
  communityAgreement: CommunityAgreement;
  onAgreementChange: (agreements: CommunityAgreement) => void;
  onMarketingClick: () => void;
}

const AgreeSectionCommunity = ({
  communityAgreement,
  onAgreementChange,
  onMarketingClick,
}: AgreementSectionProps) => {
  const isAllAgreed = Object.values(communityAgreement).every(Boolean);

  // 전체 동의/해제
  const handleAgreeAll = () => {
    const newValue = !isAllAgreed;
    onAgreementChange({
      agreedToTerms: true,
      agreedToCollectPersonalInfo: true,
      agreedToReceiveMarketingInfo: newValue,
    });
    onMarketingClick();
  };

  // 개별 체크박스 변경
  const handleCheckboxChange =
    (field: CommunityAgreeField) => (checked: boolean) => {
      const updatedAgreements = {
        ...communityAgreement,
        [field]: checked,
      };
      onAgreementChange(updatedAgreements);
    };

  const [, setExpandedState] = useState({
    agreedToTerms: false,
    agreedToCollectPersonalInfo: false,
    agreedToReceiveMarketingInfo: false,
  });

  return (
    <CardContainer>
      <label className="title">
        커뮤니티 약관동의 <span className="star">*</span>
      </label>
      <AgreeCard
        pressed={isAllAgreed}
        text="전체 동의"
        onClick={handleAgreeAll}
      />
      <AgreeCheckContainer>
        {COMMUNITY_AGREE_ITEMS.map(({ key, id, select, guide, content }) => (
          <CaregiverAgreeItem
            key={id}
            id={id}
            checked={communityAgreement[key]}
            onChange={(checked) => {
              if (select === '필수') return;
              handleCheckboxChange(key)(checked);
              if (select === '선택') {
                onMarketingClick();
              }
            }}
            select={select}
            guide={guide}
            content={content}
            onToggle={(v) =>
              setExpandedState((prev) => ({ ...prev, [key]: v }))
            }
            disabled={select === '필수'}
          />
        ))}
      </AgreeCheckContainer>
    </CardContainer>
  );
};

export default AgreeSectionCommunity;

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
