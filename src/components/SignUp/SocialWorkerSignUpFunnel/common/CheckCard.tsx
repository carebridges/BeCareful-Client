import { ReactComponent as CheckFilled } from '@/assets/icons/signup/CheckFilled.svg';
import { styled } from 'styled-components';

interface CheckCardProps {
  pressed?: boolean;
  text: string;
  onClick?: () => void;
}

export const CheckCard = ({
  pressed = false,
  text,
  onClick,
}: CheckCardProps) => {
  return (
    <CardContainer $pressed={pressed} onClick={onClick}>
      <IconWrapper $pressed={pressed}>
        <CheckFilled />
      </IconWrapper>
      <span>{text}</span>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ $pressed: boolean }>`
  will-change: background-color, border;
  transition:
    background-color 0.2s ease,
    border 0.2s ease;

  display: flex;
  height: 64px;
  padding: 24px 16px;
  box-sizing: border-box;
  align-items: center;
  flex-direction: row;
  gap: 8px;

  border-radius: 12px;
  border: ${({ theme, $pressed }) =>
    $pressed
      ? `2px solid ${theme.colors.mainBlue}`
      : `1px solid ${theme.colors.gray100}`};

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
  color: ${({ theme, $pressed }) =>
    $pressed ? theme.colors.mainBlue : theme.colors.gray200};
`;
