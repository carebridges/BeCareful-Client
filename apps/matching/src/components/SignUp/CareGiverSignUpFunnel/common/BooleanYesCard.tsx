import { ReactComponent as CircleFilled } from '@repo/ui/src/assets/icons/signup/CircleFilled.svg';
import { styled } from 'styled-components';

interface BooleanYesCardProps {
  pressed?: boolean;
  text: string;
  onClick?: () => void;
}

export const BooleanYesCard = ({
  pressed = false,
  text,
  onClick,
}: BooleanYesCardProps) => {
  return (
    <CardContainer $pressed={pressed} onClick={onClick}>
      <IconWrapper $pressed={pressed}>
        <CircleFilled />
      </IconWrapper>
      <span>{text}</span>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ $pressed?: boolean }>`
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
