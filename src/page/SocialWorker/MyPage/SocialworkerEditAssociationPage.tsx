import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ExpelButton } from '@/components/common/Button/LogoutButton';
import { NavBar } from '@/components/common/NavBar/NavBar';
import AgreeSectionCommunity from '@/components/SocialWorker/MyPage/AgreeSectionCommunity';
import InputBox from '@/components/common/InputBox/InputBox';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { ASSOCIATION_RANK_EN_TO_KR } from '@/constants/common/associationRank';
import { CommunityAgreementValues } from '@/types/Socialworker/common';
import { usePutAssociationLeave } from '@/api/communityAssociation';
import {
  usePatchSocialAssociationInfo,
  useSocialAssociationInfo,
} from '@/api/socialworker';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { getTodayDateTime } from '@/utils/getTodayDate';

const SocialworkerEditAssociationPage = () => {
  const { handleGoBack } = useHandleNavigate();
  // const [isChanged, setIsChanged] = useState(false);

  const { data } = useSocialAssociationInfo();

  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);

  const defalutAgreemet = data?.communityAgreement ?? {
    agreedToTerms: true,
    agreedToCollectPersonalInfo: true,
    agreedToReceiveMarketingInfo: true,
  };
  const [agreementStates, setAgreementStates] =
    useState<CommunityAgreementValues>(defalutAgreemet);
  const handleAgreementChange = (
    updatedAgreements: CommunityAgreementValues,
  ) => {
    setAgreementStates(updatedAgreements);
  };

  const { mutate: leaveAssociation } = usePutAssociationLeave();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const handleWithdraw = () => {
    console.log('협회탈퇴');
    leaveAssociation(undefined, {
      onSuccess: () => {
        setIsWithdrawModalOpen(false);
        handleGoBack();
      },
    });
  };

  const { mutate: updateAssociation } = usePatchSocialAssociationInfo();
  const handleMarketingClick = async () => {
    updateAssociation(
      {
        isAgreedToReceiveMarketingInfo:
          agreementStates?.agreedToReceiveMarketingInfo,
      },
      {
        onSuccess: () => {
          // handleGoBack();
          // setIsChanged(false);
          setIsAgreeModalOpen(true);
        },
      },
    );
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>소속 협회 정보</NavCenter>}
        color="white"
      />

      <InputBox
        title="소속된 협회명"
        gray={true}
        value={data?.associationInfo.associationName}
      />

      <CheckWrapper>
        <div className="titleWrapper">
          <label className="title">
            협회 회원 유형 <span>*</span>
          </label>
        </div>
        {['회장', '임원진', '회원'].map((type) => (
          <CheckButton
            key={type}
            active={
              ASSOCIATION_RANK_EN_TO_KR[data?.associationRank ?? 'MEMBER'] ===
              type
            }
          >
            <Check />
            {type} 입니다
          </CheckButton>
        ))}
      </CheckWrapper>

      <AgreeSectionCommunity
        communityAgreement={agreementStates}
        onAgreementChange={handleAgreementChange}
        onMarketingClick={handleMarketingClick}
      />

      <Border />

      <WithdrawWrapper>
        <label className="title">협회 탈퇴</label>
        <ExpelButton onClick={() => setIsWithdrawModalOpen(true)} />
      </WithdrawWrapper>

      {/* <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          협회 정보 수정하기
        </Button>
      </Bottom> */}

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsWithdrawModalOpen(false)}
          title="정말 탈퇴 하시겠습니까?"
          detail={`${data?.associationInfo.associationName} 커뮤니티에서 탈퇴됩니다.\n계속하시겠습니까?`}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => setIsWithdrawModalOpen(false)}
          handleRightBtnClick={handleWithdraw}
        />
      </Modal>

      <Modal
        isOpen={isAgreeModalOpen}
        onClose={() => setIsAgreeModalOpen(false)}
      >
        <ModalLimit
          onClose={() => setIsAgreeModalOpen(false)}
          title={`마케팅 정보 수신에 ${data?.communityAgreement.agreedToReceiveMarketingInfo ? '철회' : '동의'}하셨습니다.`}
          detail={getTodayDateTime()}
          handleBtnClick={() => setIsAgreeModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default SocialworkerEditAssociationPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .titleWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const CheckButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.gray200 : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.gray50 : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.gray600 : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.gray600 : '')};
  }
`;

const WithdrawWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

// const Bottom = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background: ${({ theme }) => theme.colors.white};
//   border-top: 1px solid ${({ theme }) => theme.colors.gray50};

//   position: fixed;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;
