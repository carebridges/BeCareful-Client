import { NavBar } from '@/components/common/NavBar/NavBar';
import { BlockCaregiverModal } from '@/components/ProfileView/BlockCaregiverModal';
import { BlockInstitutionModal } from '@/components/ProfileView/BlockInstitutionModal';
import { ProfileActionSheet } from '@/components/ProfileView/ProfileActionSheet';
import { ReportConfirmModal } from '@/components/ProfileView/ReportConfirmModal';
import { ReportReasonSheet } from '@/components/ProfileView/ReportReasonSheet';
import { UnblockConfirmModal } from '@/components/ProfileView/UnblockConfirmModal';
import { useProfileActions } from '@/hooks/useProfileActions';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as ThreeDots } from '@/assets/icons/socialworker/matching/IconThreeDots.svg';
import { ReactComponent as ProfileIcon } from '@/assets/icons/socialworker/home/CaregiverDefault.svg';
import { useState } from 'react';
import { ErrorToast } from '@/components/SocialWorker/RecruitmentDetail/ErrorToast';

type ProfileType = 'institution' | 'caregiver';

type ProfileLayoutProps = {
  profileType: ProfileType;
  joinedDateText: string;
  name: string;
  profileImageUrl: string;
  infoText: string;
  targetId: number;
  chatRoomId?: number;
  isBlocked: boolean;
};

export const ProfileLayout = ({
  profileType,
  joinedDateText,
  name,
  profileImageUrl,
  infoText,
  targetId,
  chatRoomId,
  isBlocked,
}: ProfileLayoutProps) => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  const {
    selectedOption,
    setSelectedOption,
    modals,
    handleOpenSheet,
    handleSheetConfirm,
    handleReasonConfirm,
    handleReportSubmit,
    handleBlock,
    handleUnblock,
    closeModal,
  } = useProfileActions({
    profileType,
    isBlocked,
    targetId,
    chatRoomId,
    onReportSuccess: () => {
      setToastMessage('신고가 접수되었습니다.');
    },
    onBlockSuccess: () => {
      setToastMessage('차단이 완료되었습니다.');
    },
    onUnblockSuccess: () => {
      setToastMessage('차단이 해제되었습니다.');
    },
    onErrorMessage: (msg) => setToastMessage(msg),
  });

  return (
    <Container>
      <NavBarContainer>
        <NavBar
          left={
            <NavIconButton onClick={() => navigate(-1)}>
              <ArrowLeft />
            </NavIconButton>
          }
          right={
            <NavIconButton onClick={handleOpenSheet}>
              <ThreeDots />
            </NavIconButton>
          }
          color="gray"
        />
      </NavBarContainer>

      <Content>
        <p className="date">{joinedDateText}</p>

        <ProfileImageContainer>
          {profileImageUrl ? (
            <ProfileImage src={profileImageUrl} alt={name} />
          ) : (
            <ProfileIcon />
          )}
        </ProfileImageContainer>

        <p className="name">{name}</p>
        <InfoRow>{infoText}</InfoRow>
      </Content>

      <BottomContainer />

      <ProfileActionSheet
        isOpen={modals.sheet}
        setIsOpen={(open) => {
          if (!open) {
            closeModal('sheet');
          }
        }}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
        onConfirm={handleSheetConfirm}
      />

      <ReportReasonSheet
        isOpen={modals.reason}
        setIsOpen={(open) => {
          if (!open) {
            closeModal('reason');
          }
        }}
        onConfirm={handleReasonConfirm}
      />

      {modals.reportConfirm && (
        <ReportConfirmModal
          width="312px"
          onClose={() => closeModal('reportConfirm')}
          onCancel={() => closeModal('reportConfirm')}
          onConfirm={handleReportSubmit}
        />
      )}

      {modals.blockCaregiver && (
        <BlockCaregiverModal
          width="312px"
          onClose={() => closeModal('blockCaregiver')}
          onCancel={() => closeModal('blockCaregiver')}
          onConfirm={handleBlock}
        />
      )}

      {modals.blockInstitution && (
        <BlockInstitutionModal
          width="312px"
          onClose={() => closeModal('blockInstitution')}
          onCancel={() => closeModal('blockInstitution')}
          onConfirm={handleBlock}
        />
      )}

      {modals.unblock && (
        <UnblockConfirmModal
          width="312px"
          onClose={() => closeModal('unblock')}
          onCancel={() => closeModal('unblock')}
          onConfirm={handleUnblock}
        />
      )}

      {toastMessage && <ErrorToast text={toastMessage} />}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: #f2f4f6;
`;

const NavBarContainer = styled.div`
  padding: 0 20px;
`;

const NavIconButton = styled.div`
  cursor: pointer;
`;

const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 242px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 10;
  gap: 10px;
  padding-bottom: 153px;

  .date {
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    color: ${({ theme }) => theme.colors.gray500};
  }

  .name {
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const ProfileImageContainer = styled.div`
  width: 90px;
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.05px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.05px ${({ theme }) => theme.colors.gray100};

  svg {
    transform: scale(2.8125);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray600};
`;
