import { StatusTag } from '@/components/common/Tag/StatusTag';
import { styled } from 'styled-components';

type RecruitmentSummarySectionProps = {
  institutionName: string;
  createdDateLabel: string;
  title: string;
  careLevel: string;
  recruitmentStatus: string;
  workDayLabel: string;
  workStartTime: string;
  workEndTime: string;
  salaryUnitLabel: string;
  workSalaryAmount: number;
};

export const RecruitmentSummarySection = ({
  institutionName,
  createdDateLabel,
  title,
  careLevel,
  recruitmentStatus,
  workDayLabel,
  workStartTime,
  workEndTime,
  salaryUnitLabel,
  workSalaryAmount,
}: RecruitmentSummarySectionProps) => {
  return (
    <RecruitmentContainer>
      <TitleSection>
        <SubTitle>
          <div className="name">{institutionName}</div>
          <div className="date">{createdDateLabel}</div>
        </SubTitle>
        <div className="title">{title}</div>
        <StatusTag status={recruitmentStatus} />
      </TitleSection>

      <DetailContainer>
        <DetailContent>
          <p className="type">장기요양등급</p>
          <p className="answer">{careLevel}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">근무요일</p>
          <p className="answer">{workDayLabel}</p>
        </DetailContent>
        <DetailContent>
          <p className="type">근무시간</p>
          <p className="answer">
            {workStartTime.slice(0, 5)} ~ {workEndTime.slice(0, 5)}
          </p>
        </DetailContent>
        <DetailContent>
          <p className="type">급여</p>
          <p className="answer">
            {salaryUnitLabel
              ? `${salaryUnitLabel} ${workSalaryAmount.toLocaleString()}원`
              : `${workSalaryAmount.toLocaleString()}원`}
          </p>
        </DetailContent>
      </DetailContainer>
    </RecruitmentContainer>
  );
};

const RecruitmentContainer = styled.div`
  display: flex;
  padding: 0 20px 32px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .name {
    color: #404040;
  }

  .date {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .answer {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .type {
    width: 72px;
  }
`;
