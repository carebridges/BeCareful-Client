import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { NavBar } from '@/components/common/NavBar/NavBar';
import {
  ExpelButton,
  LogoutButton,
} from '@/components/common/Button/LogoutButton';
import ProfileSection from '@/components/Caregiver/Mypage/ProfileSection';
import CareerSection from '@/components/Caregiver/Mypage/CareerSection';
import ApplicationSection from '@/components/Caregiver/Mypage/ApplicationSection';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { useDeleteUserInfo } from '@/hooks/useDeleteUserInfo';
import { useWorkApplicationToggleMutation } from '@/hooks/Caregiver/mutation/useWorkApplicationToggleMutation';
import {
  useCaregiverLogout,
  useCaregiverMyPageInfoQuery,
} from '@/api/caregiver';

const CaregiverMyPage = () => {
  const { data } = useCaregiverMyPageInfoQuery();
  const [isToggleChecked, setIsToggleChecked] = useState(false);
  const isActive = data?.workApplicationInfo?.isActive;

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setIsToggleChecked(isActive);
    }
  }, [isActive]);

  const { mutate: toggleWorkApplication } = useWorkApplicationToggleMutation({
    onSuccessCallback: (newIsActive) => {
      setIsToggleChecked(newIsActive);
    },
  });

  const handleToggleChange = () => {
    toggleWorkApplication(!isToggleChecked);
  };

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { mutate: logout } = useCaregiverLogout();
  // const { mutate: leave } = useDeleteSocialworker();
  const deleteUserInfo = useDeleteUserInfo();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: deleteUserInfo,
    });
  };

  const handleWithdraw = () => {
    // leave(undefined, {
    // onSuccess: deleteUserInfo,
    // });
  };

  return (
    <Container>
      <NavBar left={<NavLeft>마이페이지</NavLeft>} color="" />

      <ProfileSection data={data?.caregiverInfo} />

      <Border />

      <CareerSection data={data?.careerInfo} />
      <ApplicationSection
        data={data?.workApplicationInfo}
        isToggleChecked={isToggleChecked}
        handleToggleChange={handleToggleChange}
      />

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="title-label">계정</label>
        <LogoutButton onClick={() => setIsLogoutModalOpen(true)} />
        <ExpelButton onClick={() => setIsWithdrawModalOpen(true)} />
      </SectionWrapper>

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
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsWithdrawModalOpen(false)}
          title="정말 탈퇴 하시겠습니까?"
          detail={'돌봄다리 통합 서비스에서 탈퇴됩니다.\n계속하시겠습니까?'}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => setIsWithdrawModalOpen(false)}
          handleRightBtnClick={handleWithdraw}
        />
      </Modal>
    </Container>
  );
};

export default CaregiverMyPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 57px;

  div {
    display: flex;
  }

  .title-label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
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
