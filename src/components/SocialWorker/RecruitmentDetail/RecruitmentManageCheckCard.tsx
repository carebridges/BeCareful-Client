import { ReactComponent as CheckFilled } from '@/assets/icons/signup/CheckFilled.svg';
import { styled } from 'styled-components';

export type RecruitmentManageOption = 'edit' | 'close' | 'delete';

interface RecruitmentManageCheckCardProps {
  pressed?: boolean;
  option: RecruitmentManageOption;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const RecruitmentManageCheckCard = ({
  pressed = false,
  option,
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
      $option={option}
      $disabled={disabled}
      onClick={handleClick}
    >
      <IconWrapper $pressed={isPressed} $option={option} $disabled={disabled}>
        <CheckFilled />
      </IconWrapper>
      <span>{text}</span>
    </CardContainer>
  );
};

const CardContainer = styled.div<{
  $pressed: boolean;
  $option: RecruitmentManageOption;
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
  flex-direction: row;
  gap: 8px;

  border-radius: 12px;

  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  border: ${({ theme, $pressed, $option, $disabled }) => {
    if ($disabled) return `1px solid ${theme.colors.gray100}`;
    if (!$pressed) return `1px solid ${theme.colors.gray100}`;
    if ($option === 'edit') return `2px solid ${theme.colors.mainBlue}`;
    if ($option === 'close') return `2px solid ${theme.colors.mainOrange}`;
    return `2px solid ${theme.colors.mainOrange}`;
  }};

  background-color: ${({ theme, $pressed, $option, $disabled }) => {
    if ($disabled) return theme.colors.gray50;
    if (!$pressed) return theme.colors.white;
    if ($option === 'edit') return theme.colors.subBlue;
    if ($option === 'close') return theme.colors.subOrange;
    return theme.colors.subOrange;
  }};

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    color: ${({ theme, $pressed, $option, $disabled }) => {
      if ($disabled) return theme.colors.gray600;
      if (!$pressed) return theme.colors.gray900;
      if ($option === 'edit') return theme.colors.mainBlue;
      if ($option === 'close') return theme.colors.mainOrange;
      return theme.colors.mainOrange;
    }};
  }
`;

const IconWrapper = styled.div<{
  $pressed: boolean;
  $option: RecruitmentManageOption;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    path {
      fill: ${({ theme, $pressed, $option, $disabled }) => {
        if ($disabled) return theme.colors.gray200;
        if (!$pressed) return theme.colors.gray200;
        if ($option === 'edit') return theme.colors.mainBlue;
        if ($option === 'close') return theme.colors.mainOrange;
        return theme.colors.mainOrange;
      }};
    }
  }
`;
