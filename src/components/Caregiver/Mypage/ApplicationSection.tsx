import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { ReactComponent as ApplicationIcon } from '@/assets/icons/caregiver/MyWork.svg';
import { Button } from '@/components/common/Button/Button';
import { Toggle } from '@/components/common/Toggle/Toggle';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { WorkApplication } from '@/types/matching';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  formatCaretype,
  formatDaysToKR,
  formatLocation,
  formatTimeToKR,
} from '@/utils/format/domain';

interface ApplySectionProps {
  data: WorkApplication | undefined;
  isToggleChecked: boolean;
  handleToggleChange: () => void;
  hasCareer: boolean;
}

const ApplicationSection = ({
  data,
  isToggleChecked,
  handleToggleChange,
  hasCareer,
}: ApplySectionProps) => {
  const { handleNavigate } = useHandleNavigate();

  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);

  const handleApplyButtonClick = () => {
    if (hasCareer) {
      handleNavigate('/caregiver/my/application');
    } else {
      setIsCareerModalOpen(true);
    }
  };

  const applicationInfo = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        title: '케어항목',
        detail: formatCaretype(data.careTypes ?? [], 2),
      },
      {
        title: '근무요일',
        detail: formatDaysToKR(data.workDays ?? []),
      },
      {
        title: '근무시간',
        detail: formatTimeToKR(data.workTimes ?? []),
      },
      {
        title: '희망급여',
        detail: data.workSalaryAmount.toLocaleString('ko-KR'),
      },
      {
        title: '근무지역',
        detail: formatLocation(data.workLocations ?? [], 2),
      },
    ];
  }, [data]);

  return (
    <SectionWrapper>
      <label className="title-label">일자리 지원서</label>
      {data ? (
        <Application
          onClick={() => handleNavigate('/caregiver/my/application')}
        >
          <div className="top">
            <div className="left">
              <div className="dateWrapper">
                <label className="date">최근 수정일 </label>
                <span>{data.lastModifiedDate.replaceAll('-', '.')}</span>
              </div>
              <label className="title">일자리 지원서</label>
            </div>
            <div className="right">
              <Toggle
                checked={isToggleChecked ? true : false}
                onChange={handleToggleChange}
              />
              <ToggleLabel isBlue={isToggleChecked}>
                {isToggleChecked ? '지원중' : '미지원'}
              </ToggleLabel>
            </div>
          </div>
          <InfoDisplay items={applicationInfo} gapColumn="8px" gapRow="32px" />
        </Application>
      ) : (
        <NoContent>
          <NoApplication>
            <ApplicationIcon />
            <label className="title">아직 등록된 신청서가 없어요!</label>
            <label className="detail">
              일자리 신청서를 등록하고
              <br />
              나에게 딱 맞는 일자리 확인하세요!
            </label>
          </NoApplication>
          <Button
            height="52px"
            variant="subBlue"
            onClick={handleApplyButtonClick}
          >
            지원서 등록하기
          </Button>
        </NoContent>
      )}

      <Modal
        isOpen={isCareerModalOpen}
        onClose={() => setIsCareerModalOpen(false)}
      >
        <ModalButtons
          onClose={() => setIsCareerModalOpen(false)}
          title="아직 경력서가 작성되지 않았어요!"
          detail="마이페이지에서 경력서를 먼저 작성해주세요."
          left="확인"
          right="경력서 작성하기"
          handleLeftBtnClick={() => setIsCareerModalOpen(false)}
          handleRightBtnClick={() => handleNavigate('/caregiver/my/career')}
        />
      </Modal>
    </SectionWrapper>
  );
};

export default ApplicationSection;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Application = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .dateWrapper {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }
`;

const ToggleLabel = styled.label<{ isBlue: boolean | undefined }>`
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoApplication = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    text-align: center;
  }
`;
