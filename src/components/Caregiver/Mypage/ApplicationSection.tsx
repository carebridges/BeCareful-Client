import styled from 'styled-components';
import { useMemo } from 'react';
import { ReactComponent as ApplicationIcon } from '@/assets/icons/caregiver/MyWork.svg';
import { Button } from '@/components/common/Button/Button';
import { Toggle } from '@/components/common/Toggle/Toggle';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { WorkApplication } from '@/types/Caregiver/common';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  formatCaretype,
  formatDaysToKR,
  formatLocation,
  formatTimeToKR,
} from '@/utils/caregiverFormatter';

interface ApplySectionProps {
  data: WorkApplication | undefined;
  isToggleChecked: boolean;
  handleToggleChange: () => void;
}

const ApplicationSection = ({
  data,
  isToggleChecked,
  handleToggleChange,
}: ApplySectionProps) => {
  const { handleNavigate } = useHandleNavigate();

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
      <label className="title-label">일자리 신청서</label>
      {data ? (
        <Application>
          <div className="top">
            <div className="left">
              <div className="dateWrapper">
                <label className="date">최근 수정일 </label>
                <span>{data.lastModifiedDate.replaceAll('-', '.')}</span>
              </div>
              <label className="title">일자리 신청서</label>
            </div>
            <div className="right">
              <Toggle
                checked={isToggleChecked ? true : false}
                onChange={handleToggleChange}
              />
              <ToggleLabel isBlue={isToggleChecked}>
                {isToggleChecked ? '신청중' : '미신청'}
              </ToggleLabel>
            </div>
          </div>
          <InfoDisplay items={applicationInfo} gapColumn="8px" gapRow="32px" />
        </Application>
      ) : (
        <NoContent>
          <ApplicationIcon />
          <label className="title">아직 등록된 신청서가 없어요!</label>
          <label className="detail">
            일자리 신청서를 등록하고
            <br />
            나에게 딱 맞는 일자리 확인하세요!
          </label>
        </NoContent>
      )}
      <Button
        height="52px"
        variant="subBlue"
        onClick={() => handleNavigate('/caregiver/my/application')}
      >
        {data ? '신청서 수정하기' : '신청서 작성하기'}
      </Button>
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
  margin-bottom: 8px;
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
