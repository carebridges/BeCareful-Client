import { useJoinAssociation } from '@/api/communityAssociation';
import { Button } from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';
import { CaregiverAgreeItem } from '@/components/SignUp/CareGiverSignUpFunnel/Step1BasicInfo/CaregiverAgreeItem';
import {
  CENTER_TERMS,
  PRIVACY_TERMS,
  MARKETING_TERMS,
} from '@/constants/termText';
import {
  AssociationRank,
  JoinAssociationRequest,
} from '@/types/CommunityAssociation';
import { useCallback, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useCommunityAgree } from '@/hooks/Community/CommunityJoin/useCommunityAgree';

export const CommunityAcceptTermsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { associationName, selectedRank } =
    (location.state as {
      associationName?: string;
      selectedRank?: AssociationRank;
    }) || {};

  const {
    agreeState,
    expanded,
    setExpanded,
    requiredAgreed,
    isAllAgreed,
    handleCheckboxChange,
    handleAgreeAll,
  } = useCommunityAgree();

  const { mutate: joinAssociation, isPending } = useJoinAssociation();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    window.location.href = '/community';
  };

  const handleNext = useCallback(() => {
    if (!id || !selectedRank) return;

    const body: JoinAssociationRequest = {
      associationId: Number(id),
      associationRank: selectedRank,
      isAgreedToTerms: agreeState.isAgreedToTerms,
      isAgreedToCollectPersonalInfo: agreeState.isAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo: agreeState.isAgreedToReceiveMarketingInfo,
    };

    joinAssociation(body, {
      onSuccess: () => setIsSuccessModalOpen(true),
      onError: (err) => console.error('가입 실패', err),
    });
  }, [agreeState, id, joinAssociation, selectedRank]);

  return (
    <>
      <IconContainer>
        <IconArrowLeft onClick={() => navigate(-1)} />
      </IconContainer>

      <StepWrapper>
        <HeaderSection>
          <Title>
            이용약관에 동의하시겠습니까?<span className="highlight"> *</span>
          </Title>
          <SubText>필수 약관 동의 후 커뮤니티 가입을 진행합니다.</SubText>
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
              checked={agreeState.isAgreedToTerms}
              onChange={handleCheckboxChange('isAgreedToTerms')}
              select="필수"
              guide="이용약관"
              content={CENTER_TERMS}
              onToggle={(v) => setExpanded({ ...expanded, terms: v })}
            />

            <CaregiverAgreeItem
              id="2"
              checked={agreeState.isAgreedToCollectPersonalInfo}
              onChange={handleCheckboxChange('isAgreedToCollectPersonalInfo')}
              select="필수"
              guide="개인정보 수집 및 이용 동의"
              content={PRIVACY_TERMS}
              onToggle={(v) => setExpanded({ ...expanded, privacy: v })}
            />

            <CaregiverAgreeItem
              id="3"
              checked={agreeState.isAgreedToReceiveMarketingInfo}
              onChange={handleCheckboxChange('isAgreedToReceiveMarketingInfo')}
              select="선택"
              guide="마케팅 정보 수신 동의"
              content={MARKETING_TERMS}
              onToggle={(v) => setExpanded({ ...expanded, marketing: v })}
            />
          </AgreeCheckContainer>
        </AgreeWrapper>

        <ButtonContainer>
          <Button onClick={() => navigate(-1)} height="52px" variant="blue2">
            이전
          </Button>
          <Button
            onClick={handleNext}
            height="52px"
            variant={requiredAgreed ? 'blue' : 'gray'}
            disabled={!requiredAgreed || isPending}
          >
            가입신청하기
          </Button>
        </ButtonContainer>

        <Modal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose}>
          <ModalLimit
            onClose={handleSuccessModalClose}
            title={`‘${associationName}’\n커뮤니티 가입 신청이 완료되었어요!`}
            detail="협회장의 승인을 받으면 가입이 완료됩니다."
            button="확인"
            handleBtnClick={handleSuccessModalClose}
          />
        </Modal>
      </StepWrapper>
    </>
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
  padding: 0px 20px 0 20px;
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

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;
