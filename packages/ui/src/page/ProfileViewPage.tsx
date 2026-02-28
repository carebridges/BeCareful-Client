'use client';
import { ReactComponent as ArrowLeft } from '../assets/icons/ArrowLeft.svg';
import { ReactComponent as InstitutionAvatar } from '../assets/icons/Institution_avatar.svg';
import { ReactComponent as PersonAvatar } from '../assets/icons/Person_avatar.svg';
import { ReactComponent as ThreeDots } from '../assets/icons/socialworker/matching/IconThreeDots.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/socialworker/home/CaregiverDefault.svg';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useProfileActions } from '@repo/common';
import {
  BlockCaregiverModal,
  BlockInstitutionModal,
  NavBar,
  ProfileActionSheet,
  ReportConfirmModal,
  ReportReasonSheet,
  UnblockConfirmModal,
} from '../components';

type ProfileInfoProps = {
  type: 'institution' | 'caregiver';
  text: string;
};

const ProfileInfo = ({ type, text }: ProfileInfoProps) => {
  return (
    <InfoRow>
      {type === 'institution' ? <InstitutionAvatar /> : <PersonAvatar />}
      <span className="text">{text}</span>
    </InfoRow>
  );
};

export const ProfileViewPage = () => {
  // TODO : navigate 관련
  const navigate = useNavigate();

  // TODO 현재는 임시로 하드코딩
  const profileType: 'institution' | 'caregiver' = 'institution';
  const isBlocked = false;

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
  } = useProfileActions(profileType, isBlocked);

  return (
    <Container>
      <NavBarContainer>
        <NavBar
          left={
            <NavLeft onClick={() => navigate(-1)}>
              <ArrowLeft />
            </NavLeft>
          }
          right={
            <NavLeft onClick={handleOpenSheet}>
              <ThreeDots />
            </NavLeft>
          }
          color="gray"
        />
      </NavBarContainer>

      <Content>
        <p className="date">2025년 12월 20일 가입</p>
        <ProfileImage>
          <ProfileIcon />
        </ProfileImage>
        <p className="name">김기관</p>
        <ProfileInfo type="institution" text="사랑행복복지센터" />
      </Content>

      <BottomContainer />

      <ProfileActionSheet
        isOpen={modals.sheet}
        setIsOpen={(open: boolean) => {
          if (!open) closeModal('sheet');
        }}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
        onConfirm={handleSheetConfirm}
      />

      <ReportReasonSheet
        isOpen={modals.reason}
        setIsOpen={(open: boolean) => {
          if (!open) closeModal('reason');
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

const NavLeft = styled.div`
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

const ProfileImage = styled.div`
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

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray600};
`;
