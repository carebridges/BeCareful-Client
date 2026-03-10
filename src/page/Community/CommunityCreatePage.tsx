import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as AD1 } from '@/assets/icons/AD1.svg';
import { ReactComponent as ArrowRightCircle } from '@/assets/icons/caregiver/home/ArrowRightCircle.svg';

import { NavBar } from '@/components/common/NavBar/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { useJoinStatusModal } from '@/hooks/Community/CommunityJoin/useJoinStatusModal';

export const CommunityCreatePage = () => {
  const navigate = useNavigate();
  useLoadUserInfo();

  const handleLogoClick = () => {
    navigate('/socialworker'); //TODO
  };

  const handleChatClick = () => {
    navigate('/socialworker/chat'); //TODO
  };

  const { isRejectedModalOpen, associationName, closeRejectedModal } =
    useJoinStatusModal();

  const handleCreateClick = () => {
    navigate('/community/signup');
    window.scrollTo(0, 0);
  };

  const handleJoinClick = () => {
    navigate('/community/members/new');
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft onClick={handleLogoClick}>
            <Logo />
          </NavLeft>
        }
        right={
          <NavRight onClick={handleChatClick}>
            <Chat />
          </NavRight>
        }
        color="blue"
      />

      <AdWrapper>
        <AD1 />
      </AdWrapper>

      <SectionWrapper>
        <div className="title">내 협회 찾기</div>
        <ButtonsWrapper>
          <ApplyButton $light onClick={handleCreateClick}>
            <ApplyWrapper>
              <Label>협회 회장님이라면?</Label>
              <ApplyTitle>만들기</ApplyTitle>
            </ApplyWrapper>
            <ChangeWrapper>
              <Label>협회 회장</Label>
              <Arrow light>
                <ArrowRightCircle />
              </Arrow>
            </ChangeWrapper>
          </ApplyButton>

          <ApplyButton onClick={handleJoinClick}>
            <ApplyWrapper>
              <Label>소속된 협회가 있다면?</Label>
              <ApplyTitle>검색하기</ApplyTitle>
            </ApplyWrapper>
            <ChangeWrapper>
              <Label>협회 임원진/회원</Label>
              <Arrow>
                <ArrowRightCircle />
              </Arrow>
            </ChangeWrapper>
          </ApplyButton>
        </ButtonsWrapper>
      </SectionWrapper>

      <SocialWorkerTabBar />

      <Modal isOpen={isRejectedModalOpen} onClose={closeRejectedModal}>
        <ModalLimit
          onClose={closeRejectedModal}
          title={`${associationName ?? ''} 커뮤니티 가입이 반려되었습니다.`}
          detail="가입 조건에 부합하지 않아 반려되었습니다."
          button="확인"
          handleBtnClick={closeRejectedModal}
        />
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  background: #f2f3f7;
  height: 100vh;
  margin-bottom: 57px;
`;

const NavLeft = styled.div`
  width: 84px;
  height: 32px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  padding-right: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
`;

const AdWrapper = styled.div`
  margin: 20px;
  height: 84px;
  border-radius: 12px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.03);
  background: #ebe8fe;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0px 20px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ApplyButton = styled.button<{ $light?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  height: 186px;
  border-radius: 12px;
  width: 100%;
  background: ${({ $light, theme }) =>
    $light
      ? 'linear-gradient(143deg, var(--White, #FFF) 0%, var(--sub-blue, #F0F5FF) 98.95%)'
      : theme.colors.mainBlue};
  color: ${({ $light, theme }) =>
    $light ? theme.colors.mainBlue : theme.colors.white};

  ${({ $light }) =>
    $light &&
    `
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  `}
`;

const ApplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const Label = styled.label`
  color: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ApplyTitle = styled.label`
  color: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ChangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Arrow = styled.div<{ light?: boolean }>`
  color: ${({ light, theme }) =>
    light ? theme.colors.mainBlue : theme.colors.white};

  --arrow-stroke: ${({ light, theme }) =>
    light ? theme.colors.white : theme.colors.mainBlue};
`;
