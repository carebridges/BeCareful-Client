import { ReactComponent as CheckFilled } from '@repo/ui/src/assets/icons/signup/CheckFilled.svg';
import { styled } from 'styled-components';

export type CheckCardTone = 'blue' | 'orange' | 'gray';

interface RecruitmentManageCheckCardProps {
  pressed?: boolean;
  tone: CheckCardTone;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const RecruitmentManageCheckCard = ({
  pressed = false,
  tone,
  text,
  disabled = false,
  onClick,
}: RecruitmentManageCheckCardProps) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const isPressed = pressed && !disabled;

  return (
    <CardContainer
      $pressed={isPressed}
      $tone={tone}
      $disabled={disabled}
      onClick={handleClick}
    >
      <IconWrapper $pressed={isPressed} $tone={tone} $disabled={disabled}>
        <CheckFilled />
      </IconWrapper>
      <span>{text}</span>
    </CardContainer>
  );
};

const CardContainer = styled.div<{
  $pressed: boolean;
  $tone: CheckCardTone;
  $disabled: boolean;
}>`
  will-change: background-color, border;
  transition:
    background-color 0.2s ease,
    border 0.2s ease;

  display: flex;
  height: 64px;
  padding: 24px 16px;
  box-sizing: border-box;
  align-items: center;
  gap: 8px;

  border-radius: 12px;

  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  border: ${({ theme, $pressed, $tone, $disabled }) => {
    if ($disabled || !$pressed) return `1px solid ${theme.colors.gray100}`;

    if ($tone === 'blue') return `2px solid ${theme.colors.mainBlue}`;
    if ($tone === 'orange') return `2px solid ${theme.colors.mainOrange}`;

    return `2px solid ${theme.colors.gray300}`;
  }};

  background-color: ${({ theme, $pressed, $tone, $disabled }) => {
    if ($disabled) return theme.colors.gray50;
    if (!$pressed) return theme.colors.white;

    if ($tone === 'blue') return theme.colors.subBlue;
    if ($tone === 'orange') return theme.colors.subOrange;

    return theme.colors.gray100;
  }};

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    color: ${({ theme, $pressed, $tone, $disabled }) => {
      if ($disabled) return theme.colors.gray600;
      if (!$pressed) return theme.colors.gray900;

      if ($tone === 'blue') return theme.colors.mainBlue;
      if ($tone === 'orange') return theme.colors.mainOrange;

      return theme.colors.gray700;
    }};
  }
`;

const IconWrapper = styled.div<{
  $pressed: boolean;
  $tone: CheckCardTone;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg path {
    fill: ${({ theme, $pressed, $tone, $disabled }) => {
      if ($disabled || !$pressed) return theme.colors.gray200;
      if ($tone === 'blue') return theme.colors.mainBlue;
      if ($tone === 'orange') return theme.colors.mainOrange;
      return theme.colors.gray700;
    }};
  }
`;
