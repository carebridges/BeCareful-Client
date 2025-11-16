import { ReactComponent as CircleCheck } from '@/assets/icons/matching/CircleCheck.svg';
import { useState } from 'react';
import { styled } from 'styled-components';

interface MatchingCareCardProps {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  initialChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const MatchingCareCard = ({
  title,
  Icon,
  initialChecked,
  onChange,
}: MatchingCareCardProps) => {
  const [isClicked, setIsClicked] = useState(initialChecked);

  const handleClick = () => {
    const newCheckedState = !isClicked;
    setIsClicked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <CardContainer $isClicked={isClicked} onClick={handleClick}>
      <LeftContainer>
        <span className="highlight">{title}</span>
        <Icon />
      </LeftContainer>
      <RightContainer $isClicked={isClicked}>
        <CircleCheck />
      </RightContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ $isClicked: boolean }>`
  display: flex;
  height: 52px;
  padding: 24px 16px;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  border: ${({ theme, $isClicked }) =>
    $isClicked
      ? `2px solid ${theme.colors.mainBlue}`
      : `1px solid ${theme.colors.gray100}`};
  background-color: ${({ $isClicked, theme }) =>
    $isClicked ? theme.colors.subBlue : theme.colors.white};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const RightContainer = styled.div<{ $isClicked: boolean }>`
  display: flex;
  align-items: center;

  path {
    fill: ${({ $isClicked, theme }) =>
      $isClicked ? theme.colors.mainBlue : theme.colors.gray200};
  }
`;
