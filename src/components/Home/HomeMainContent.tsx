import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowRightCircle } from '@/assets/icons/caregiver/home/ArrowRightCircle.svg';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import { useJoinStatusModal } from '@/hooks/Community/CommunityJoin/useJoinStatusModal';

export const HomeMainContent = () => {
  const navigate = useNavigate();

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
    <SectionWrapper>
      <ScheduleWrapper>
        <ScheduleDetail>새로운 커뮤니티를 둘러보세요!</ScheduleDetail>
        <ScheduleTitle>아직 가입된 커뮤니티가 없어요.</ScheduleTitle>
      </ScheduleWrapper>

      <ButtonsWrapper>
        <ApplyButton $light onClick={handleCreateClick}>
          <ApplyWrapper>
            <Label>커뮤니티</Label>
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
            <Label>커뮤니티</Label>
            <ApplyTitle>가입하기</ApplyTitle>
          </ApplyWrapper>
          <ChangeWrapper>
            <Label>협회 임원진/회원</Label>
            <Arrow>
              <ArrowRightCircle />
            </Arrow>
          </ChangeWrapper>
        </ApplyButton>
      </ButtonsWrapper>

      <Modal isOpen={isRejectedModalOpen} onClose={closeRejectedModal}>
        <ModalLimit
          onClose={closeRejectedModal}
          title={`${associationName ?? ''} 커뮤니티 가입이 반려되었습니다.`}
          detail="가입 조건에 부합하지 않아 반려되었습니다."
          button="확인"
          handleBtnClick={closeRejectedModal}
        />
      </Modal>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 192px;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 16px 20px;
  height: 68px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const ScheduleDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ScheduleTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
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
