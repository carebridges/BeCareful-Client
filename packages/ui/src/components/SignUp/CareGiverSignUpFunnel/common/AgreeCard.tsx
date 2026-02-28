'use client';
import { ReactComponent as CheckFilled } from '../../../../assets/icons/signup/CheckFilled.svg';
import { styled } from 'styled-components';

interface AgreeCardProps {
  pressed?: boolean;
  text: string;
  onClick?: () => void;
}

export const AgreeCard = ({
  pressed = false,
  text,
  onClick,
}: AgreeCardProps) => {
  return (
    <CardContainer $pressed={pressed} onClick={onClick}>
      <IconWrapper $pressed={pressed}>
        <CheckFilled />
      </IconWrapper>
      <span>{text}</span>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ $pressed?: boolean }>`
  width: 100%;
  display: flex;
  height: 52px;
  padding: 24px 12px;
  box-sizing: border-box;
  align-items: center;
  flex-direction: row;
  gap: 8px;

  border-radius: 12px;
  border: ${({ theme, $pressed }) =>
    `${$pressed ? '2px' : '1px'} solid ${
      $pressed ? theme.colors.mainBlue : theme.colors.gray100
    }`};

  background-color: ${({ theme, $pressed }) =>
    $pressed ? theme.colors.subBlue : theme.colors.white};

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const IconWrapper = styled.div<{ $pressed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  path {
    fill: ${({ theme, $pressed }) =>
      $pressed ? theme.colors.mainBlue : theme.colors.gray200};
  }
`;
