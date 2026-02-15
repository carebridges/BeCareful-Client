import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { ErrorToast } from '@/components/SocialWorker/RecruitmentDetail/ErrorToast';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  useUnblockCaregiver,
  useSocialBlockedCaregiver,
} from '@/api/user/socialworker';
import { BlockCaregiverInfo } from '@/types/Socialworker/mypage';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';

const SocialworkerBlockPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const [selectedUser, setSelectedUser] = useState<BlockCaregiverInfo | null>();
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data } = useSocialBlockedCaregiver();

  const handleBlockCancleClick = (user: BlockCaregiverInfo) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const { mutate: blockCancle } = useUnblockCaregiver();

  const handleBlockCancle = () => {
    if (selectedUser && selectedUser.caregiverId) {
      blockCancle(selectedUser.caregiverId, {
        onSuccess: () => {
          setSelectedUser(null);
          setToastMessage('차단이 해제되었습니다');
          setIsBlockModalOpen(false);
        },
      });
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastMessage]);

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>차단 사용자 관리</NavCenter>}
      />

      {data?.map((user) => (
        <UserCardWrapper>
          <UserCard>
            <div className="left">
              <img src={user.profileImageUrl} />
              <div className="profile">
                <div className="name">{user.name}</div>
                <div className="info">
                  <div>{user.age}세</div>
                  <div>·</div>
                  <div>{GENDER_EN_TO_KR_2[user.gender]}</div>
                </div>
              </div>
            </div>
            <Button
              width="80px"
              height="36px"
              variant="subBlue"
              onClick={() => handleBlockCancleClick(user)}
            >
              차단해제
            </Button>
          </UserCard>
        </UserCardWrapper>
      ))}

      <Modal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsBlockModalOpen(false)}
          title="차단 해제하시겠습니까?"
          detail={`${selectedUser?.name}님을 차단 해제합니다.`}
          left="취소"
          right="해제하기"
          handleLeftBtnClick={() => setIsBlockModalOpen(false)}
          handleRightBtnClick={handleBlockCancle}
          color="red"
        />
      </Modal>

      {toastMessage && <ErrorToast text={toastMessage} />}
    </Container>
  );
};

export default SocialworkerBlockPage;

const Container = styled.div`
  margin-bottom: 60px;
`;

const NavLeft = styled(ArrowLeft)`
  margin-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const UserCardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:last-child {
    border-bottom: none;
  }
`;

const UserCard = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    gap: 8px;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
  }

  .profile {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .info {
    display: flex;
    gap: 3px;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;
