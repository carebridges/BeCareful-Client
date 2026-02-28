'use client';
import styled from 'styled-components';
import Chevron from '../../../assets/icons/ChevronRightProfile.svg';

interface AssociationCardProps {
  association: string;
  onClick?: () => void;
  type: string;
}

export const AssociationCard = ({
  association,
  onClick,
}: AssociationCardProps) => {
  return (
    <CardContainer onClick={onClick}>
      <div className="top">
        <label className="association">{association}</label>
        {onClick && <Chevron />}
      </div>
    </CardContainer>
  );
};

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
    color: ${({ theme }) => theme.colors.gray500};
  }

  .association {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
