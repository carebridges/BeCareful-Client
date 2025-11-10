import styled from 'styled-components';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';

interface AssociationCardProps {
  association: string;
  type: string;
  rank: string;
}

const AssociationCard = ({ association, type, rank }: AssociationCardProps) => {
  const associationInfo = [
    { title: '회원유형', detail: type },
    { title: '직급', detail: rank },
  ];

  return (
    <CardContainer>
      <label className="association">{association}</label>
      <InfoDisplay items={associationInfo} />
    </CardContainer>
  );
};

export default AssociationCard;

const CardContainer = styled.div`
  display: flex;
  padding: 20px 20px 24px 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .association {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
