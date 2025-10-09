import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Elderly } from '@/assets/icons/socialworker/home/ElderlyDefault.svg';
import { ReactComponent as Caregiver } from '@/assets/icons/socialworker/home/CaregiverDefault.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/ChevronRight.svg';
import { Button } from '@/components/common/Button/Button';
import RankCard from '@/components/SocialWorker/Home/RankCard';
import Modal from '@/components/common/Modal/Modal';
import { InstitutionInfo } from '@/types/Socialworker/home';

interface InstitutionSectionProps {
  data: InstitutionInfo | undefined;
}

const InstitutionSection = ({ data }: InstitutionSectionProps) => {
  const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);

  return (
    <Institution>
      <div className="container">
        <div className="left">
          <Elderly />
          <label className="type">어르신</label>
        </div>
        <div className="right">
          <label className="people">
            <span>{data?.elderlyCount}</span>명
          </label>
          <Chevron />
        </div>
      </div>

      <div className="border" />

      <div className="container">
        <div className="left">
          <Caregiver />
          <label className="type">직원</label>
        </div>
        <div className="right" onClick={() => setIsInstitutionModalOpen(true)}>
          <label className="people">
            <span>{data?.socialWorkerCount}</span>명
          </label>
          <Chevron />
        </div>
      </div>

      <Modal
        isOpen={isInstitutionModalOpen}
        onClose={() => setIsInstitutionModalOpen(false)}
      >
        <ModalWrapper>
          <div className="top">
            <div className="title">
              <label className="title">소속 기관 직원</label>
              <span>{data?.socialWorkerCount}</span>
            </div>
            <ModalXImg onClick={() => setIsInstitutionModalOpen(false)} />
          </div>

          <ModalSocial>
            {data?.socialWorkerList.map((socialworker, index) => (
              <div className="socialworker" key={index}>
                <label className="name">{socialworker.name}</label>
                <RankCard rank={socialworker.institutionRank} />
              </div>
            ))}
          </ModalSocial>

          <div className="buttons">
            <Button
              height="52px"
              variant="subBlue"
              onClick={() => setIsInstitutionModalOpen(false)}
            >
              취소
            </Button>
            <Button
              height="52px"
              variant="mainBlue"
              onClick={() => setIsInstitutionModalOpen(false)}
            >
              확인
            </Button>
          </div>
        </ModalWrapper>
      </Modal>
    </Institution>
  );
};

export default InstitutionSection;

const Institution = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);

  .container {
    display: flex;
    justify-content: space-between;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }

  .left {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .type {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .right {
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;
  }

  .people {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    cursor: pointer;
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    cursor: pointer;
  }

  .border {
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const Chevron = styled(ChevronRight)`
  cursor: pointer;
  color: #666666;
`;

const ModalWrapper = styled.div`
  padding: 20px;
  padding-top: 28px;
  width: 272px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  .top {
    display: flex;
    justify-content: space-between;
  }

  .title {
    display: flex;
    gap: 4px;
    align-items: center;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .buttons {
    width: 100%;
    display: flex;
    gap: 8px;
  }
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;

const ModalSocial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .socialworker {
    padding-bottom: 12px;

    display: flex;
    gap: 6px;
    align-items: center;

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

    &:last-child {
      padding-bottom: 0px;
      border-bottom: none;
    }
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;
