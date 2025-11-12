import styled from 'styled-components';
import { ReactComponent as Chevron } from '@/assets/icons/ChevronRightProfile.svg';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { formatCaretype } from '@/utils/caregiverFormatter';
import { InstitutionRank } from '@/types/Community/common';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

interface InstitutionCardProps {
  institution: string;
  institutionRank?: InstitutionRank;
  year: number;
  types: string[];
  phoneNumber: string;
}

const InstitutionCard = ({
  institution,
  institutionRank,
  year,
  types,
  phoneNumber,
}: InstitutionCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  const isSocialworker = institutionRank === 'SOCIAL_WORKER';

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
    { title: '시설유형', detail: formatCaretype(types, 2) },
    { title: '연락처', detail: phoneNumber },
  ];

  return (
    <CardContainer>
      <div className="top">
        <label className="institution">{institution}</label>
        {!isSocialworker && (
          <Chevron
            onClick={() => handleNavigate('/socialworker/my/institution')}
          />
        )}
      </div>
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

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg {
    cursor: pointer;
  }

  .institution {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
