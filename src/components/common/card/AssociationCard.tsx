import styled from 'styled-components';
import { ReactComponent as Chevron } from '@/assets/icons/ChevronRightProfile.svg';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';

interface AssociationCardProps {
  association: string;
  onClick?: () => void;
  type: string;
}

const AssociationCard = ({
  association,
  onClick,
  type,
}: AssociationCardProps) => {
  const associationInfo = [{ title: '회원유형', detail: type }];

  return (
    <CardContainer>
      <div className="top">
        <label className="association">{association}</label>
        {onClick && <Chevron onClick={onClick} />}
      </div>
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

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg {
    cursor: pointer;
  }

  .association {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
