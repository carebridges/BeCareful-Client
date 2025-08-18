import styled from 'styled-components';
import { colors } from '@/style/theme/color';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { Button } from '@/components/common/Button/Button';
import { Salary_Type_Mapping } from '@/constants/caregiverMapping';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { Recruitment } from '@/types/Caregiver/common';
import { caretypeFormat, dayFormat } from '@/utils/caregiver';

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

  const applyInfo = [
    {
      title: '케어항목',
      detail: caretypeFormat(
        recruitment.recruitmentInfo.careTypes.map((itme) => itme.careType),
        2,
      ),
    },
    {
      title: '근무요일',
      detail: dayFormat(recruitment.recruitmentInfo.workDays),
    },
    {
      title: '근무시간',
      detail: `${recruitment.recruitmentInfo.workStartTime} ~ ${recruitment.recruitmentInfo.workEndTime}`,
    },
  ];

  return (
    <CardContainer>
      <State bgColor={bgColor} stateColor={stateColor}>
        <div className="circle" />
        <label className="state">{stateLabel}</label>
      </State>

      <Title>
        <label className="institution">
          {recruitment.recruitmentInfo.institutionName}
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

      <Salary>
        <label className="type">
          {Salary_Type_Mapping[recruitment.recruitmentInfo.workSalaryUnitType]}
        </label>
        <label className="amount">
          {recruitment.recruitmentInfo.workSalaryAmount.toLocaleString('ko-KR')}
          <span>원</span>
        </label>
      </Salary>

      <Button
        height="52px"
        variant="subBlue"
        onClick={() =>
          handleNavigate(
            `/caregiver/${navigatePath}/${recruitment.recruitmentInfo.recruitmentId}`,
          )
        }
      >
        자세히 보기
      </Button>
    </CardContainer>
  );
};

export default CaregiverWorkCard;

const CardContainer = styled.div`
  display: flex;
  padding: 20px 20px 28px 20px;
  flex-direction: column;
  gap: 12px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const State = styled.div<{ stateColor: ColorKey; bgColor: ColorKey }>`
  width: fit-content;
  padding: 4px 8px;
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

const Title = styled.div`
  flex-direction: column;
  gap: 4px;

  .institution {
    color: ${({ theme }) => theme.colors.gray700};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Tags = styled.div`
  gap: 6px;

  .tag {
    padding: 4px 8px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Salary = styled.div`
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
