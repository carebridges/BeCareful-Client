import styled from 'styled-components';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { caretypeFormat } from '@/utils/caregiver';

interface InstitutionCardProps {
  date: string;
  institution: string;
  year: number;
  types: string[];
  phoneNumber: string;
}

const InstitutionCard = ({
  date,
  institution,
  year,
  types,
  phoneNumber,
}: InstitutionCardProps) => {
  const currentYear = new Date().getFullYear();
  const years = currentYear - year;

  const institutionInfo = [
    {
      title: '개소연도',
      detail: (
        <>
          {year}년 <span>({years}년 차)</span>
        </>
      ),
    },
    { title: '시설유형', detail: caretypeFormat(types, 2) },
    { title: '연락처', detail: phoneNumber },
  ];

  return (
    <CardContainer>
      <DateWrapper>
        <label className="fix">최근 수정일</label>
        <label className="date">{date}</label>
      </DateWrapper>

      <label className="institution">{institution}</label>
      <InfoDisplay items={institutionInfo} />
    </CardContainer>
  );
};

export default InstitutionCard;

const CardContainer = styled.div`
  display: flex;
  padding: 20px 20px 24px 20px;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .institution {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 6px;

  label {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .date {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
