import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Chevron } from '@/assets/icons/ChevronRightProfile.svg';
import { ReactComponent as LogoutIcon } from '@/assets/icons/Logout.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { UserRole } from '@/types/common/chat';
import { getTodayDateTime } from '@/utils/getTodayDate';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useNavigationActions } from '@/hooks/MyPage/useNavigationActions';
import { useMarketingAgreement } from '@/hooks/MyPage/useMarketingAgreement';
import { useUserAuthActions } from '@/hooks/MyPage/useUserAuthActions';

interface SettingPageProps {
  role: UserRole;
}

const SettingPage = ({ role }: SettingPageProps) => {
  const { handleGoBack } = useHandleNavigate();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { handleService, handlePrivacy, handlePasswordChange } =
    useNavigationActions(role);

  const {
    isMarketingAgree,
    isAgreeModalOpen,
    setIsAgreeModalOpen,
    handleMarketingClick,
  } = useMarketingAgreement(role);

  const { handleLogout, handleLeave } = useUserAuthActions(role);

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>설정</NavCenter>}
      />

      <MenuWrapper>
        <div className="title">이용약관</div>
        <Menu onClick={handleService}>
          <div className="menu">서비스 이용약관</div>
          <Chevron />
        </Menu>
        <Menu onClick={handlePrivacy}>
          <div className="menu">개인정보 처리방침</div>
          <Chevron />
        </Menu>
      </MenuWrapper>

      <Border />

      <MenuWrapper>
        <div className="title">알림</div>
        <Menu>
          <div className="menu">마케팅 정보 수신 동의</div>
          <Toggle checked={isMarketingAgree} onChange={handleMarketingClick} />
        </Menu>
      </MenuWrapper>

      <Border />

      {/* 
      <MenuWrapper>
        <div className="title">사용자 설정</div>
        <Menu onClick={handleBlock}>
          <div className="menu">차단 사용자 관리</div>
          <Chevron />
        </Menu>
      </MenuWrapper> 

      <Border />
      */}

      <MenuWrapper>
        <div className="title">계정</div>
        <Menu onClick={() => setIsPasswordModalOpen(true)}>
          <div className="menu">비밀번호 변경</div>
          <Chevron />
        </Menu>
      </MenuWrapper>

      <Border />

      <Menu onClick={() => setIsLogoutModalOpen(true)}>
        <div className="menu">로그아웃</div>
        <LogoutIcon />
      </Menu>
      <Menu onClick={() => setIsLeaveModalOpen(true)}>
        <div className="expel">탈퇴하기</div>
        <LogoutIcon />
      </Menu>

      <Modal
        isOpen={isAgreeModalOpen}
        onClose={() => setIsAgreeModalOpen(false)}
      >
        <ModalLimit
          onClose={() => setIsAgreeModalOpen(false)}
          title={`마케팅 정보 수신에 ${isMarketingAgree ? '동의' : '철회'}하셨습니다.`}
          detail={getTodayDateTime()}
          handleBtnClick={() => setIsAgreeModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsPasswordModalOpen(false)}
          title="비밀번호를 변경하시겠습니까?"
          detail={
            '1:1 문의하기로 연락 주시면\n담당자가 확인 후 답변을 드립니다.'
          }
          left="취소"
          right="변경하기"
          handleLeftBtnClick={() => setIsPasswordModalOpen(false)}
          handleRightBtnClick={handlePasswordChange}
        />
      </Modal>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsLogoutModalOpen(false)}
          title="로그아웃 하시겠습니까?"
          detail="현재 계정에서 로그아웃됩니다. 계속하시겠습니까?"
          left="취소"
          right="로그아웃"
          handleLeftBtnClick={() => setIsLogoutModalOpen(false)}
          handleRightBtnClick={handleLogout}
        />
      </Modal>

      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsLeaveModalOpen(false)}
          title="정말 탈퇴하시겠습니까?"
          detail={'돌봄다리 통합 서비스에서 탈퇴됩니다.\n계속하시겠습니까?'}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => setIsLeaveModalOpen(false)}
          handleRightBtnClick={handleLeave}
          color="red"
        />
      </Modal>
    </Container>
  );
};

export default SettingPage;

const Container = styled.div`
  margin-bottom: 72px;
  padding: 0px 20px;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  margin: 15px 0px;
  margin-left: -20px;
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const MenuWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;

  .title {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Menu = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .menu {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .expel {
    color: ${({ theme }) => theme.colors.gray500};
  }

  svg {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
