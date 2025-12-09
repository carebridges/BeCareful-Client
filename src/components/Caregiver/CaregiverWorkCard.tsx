import styled from 'styled-components';
import { colors } from '@/style/theme/color';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { SALARY_EN_TO_KR } from '@/constants/common/salary';
import { useRecruitmentReadStatus } from '@/contexts/RecruitmentReadStatusContext';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { Recruitment } from '@/types/Caregiver/common';
import { formatCaretype, formatDaysToKR } from '@/utils/caregiverFormatter';
import { formatDateTime } from '@/utils/formatTime';

type ColorKey = keyof typeof colors;
interface CaregiverWorkCardProps {
  recruitment: Recruitment;
  stateColor: ColorKey;
  bgColor: ColorKey;
  stateLabel: string;
  navigatePath: string;
}

const CaregiverWorkCard = ({
  recruitment,
  stateColor,
  bgColor,
  stateLabel,
  navigatePath,
}: CaregiverWorkCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  const { readStatuses } = useRecruitmentReadStatus();
  const isRead =
    readStatuses[recruitment.recruitmentInfo.recruitmentId] || false;

  const applyInfo = [
    {
      title: '케어항목',
      detail: formatCaretype(recruitment.recruitmentInfo.careTypes, 2),
    },
    {
      title: '근무일정',
      detail: `${formatDaysToKR(recruitment.recruitmentInfo.workDays)} ${recruitment.recruitmentInfo.workStartTime}~${recruitment.recruitmentInfo.workEndTime}`,
    },
    {
      title: '근무지역',
      detail: recruitment.recruitmentInfo.workLocation,
    },
  ];

  return (
    <CardContainer
      onClick={() =>
        handleNavigate(
          `/caregiver/${navigatePath}/${recruitment.recruitmentInfo.recruitmentId}`,
        )
      }
    >
      <State bgColor={bgColor} stateColor={stateColor}>
        <div className="circle" />
        <label className="state">{stateLabel}</label>
      </State>

      <Title isRead={isRead}>
        <label className="institution">
          {recruitment.recruitmentInfo.institutionInfo.name}
        </label>
        <label className="title">{recruitment.recruitmentInfo.title}</label>
      </Title>

      {(recruitment.matchingResultStatus === '높음' ||
        recruitment.isHotRecruitment ||
        recruitment.isHourlySalaryTop) && (
        <Tags>
          {recruitment.matchingResultStatus === '높음' && (
            <label className="tag">적합도 높음</label>
          )}
          {recruitment.isHotRecruitment && (
            <label className="tag">인기공고</label>
          )}
          {recruitment.isHourlySalaryTop && (
            <label className="tag">시급 TOP</label>
          )}
        </Tags>
      )}

      <InfoDisplay items={applyInfo} gapColumn="4px" gapRow="12px" />

      <Bottom>
        <Salary>
          <label className="type">
            {SALARY_EN_TO_KR[recruitment.recruitmentInfo.workSalaryUnitType]}
          </label>
          <label className="amount">
            {recruitment.recruitmentInfo.workSalaryAmount.toLocaleString(
              'ko-KR',
            )}
            <span>원</span>
          </label>
        </Salary>
        <div className="date">
          {formatDateTime(recruitment.recruitmentInfo.createdTime)}
        </div>
      </Bottom>
    </CardContainer>
  );
};

export default CaregiverWorkCard;

const CardContainer = styled.div`
  padding: 20px 20px 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const State = styled.div<{ stateColor: ColorKey; bgColor: ColorKey }>`
  padding: 4px 8px;
  width: fit-content;
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme, bgColor }) => theme.colors[bgColor]};

  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme, stateColor }) => theme.colors[stateColor]};
  }

  .state {
    color: ${({ theme, stateColor }) => theme.colors[stateColor]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Title = styled.div<{ isRead: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .institution {
    color: ${({ theme }) => theme.colors.gray700};
  }

  .title {
    color: ${({ theme, isRead }) =>
      isRead ? theme.colors.gray300 : theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;

  .tag {
    padding: 4px 8px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  .date {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  }
`;

const Salary = styled.div`
  display: flex;
  align-items: center;

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .type {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }
`;
