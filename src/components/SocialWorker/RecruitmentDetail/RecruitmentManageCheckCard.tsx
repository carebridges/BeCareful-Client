import { ReactComponent as CheckFilled } from '@/assets/icons/signup/CheckFilled.svg';
import { styled } from 'styled-components';

export type RecruitmentManageOption = 'edit' | 'close' | 'delete';

interface RecruitmentManageCheckCardProps {
  pressed?: boolean;
  option: RecruitmentManageOption;
  text: string;
  onClick?: () => void;
}

export const RecruitmentManageCheckCard = ({
  pressed = false,
  option,
  text,
  onClick,
}: RecruitmentManageCheckCardProps) => {
  return (
    <CardContainer $pressed={pressed} $option={option} onClick={onClick}>
      <IconWrapper $pressed={pressed} $option={option}>
        <CheckFilled />
      </IconWrapper>
      <span>{text}</span>
    </CardContainer>
  );
};

const CardContainer = styled.div<{
  $pressed: boolean;
  $option: RecruitmentManageOption;
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

  border: ${({ theme, $pressed, $option }) => {
    if (!$pressed) return `1px solid ${theme.colors.gray100}`;
    if ($option === 'edit') return `2px solid ${theme.colors.mainBlue}`;
    if ($option === 'close') return `2px solid ${theme.colors.mainOrange}`;
    return `2px solid ${theme.colors.mainOrange}`;
  }};

  background-color: ${({ theme, $pressed, $option }) => {
    if (!$pressed) return theme.colors.white;
    if ($option === 'edit') return theme.colors.subBlue;
    if ($option === 'close') return theme.colors.subOrange;
    return theme.colors.subOrange;
  }};

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    color: ${({ theme, $pressed, $option }) => {
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
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    path {
      fill: ${({ theme, $pressed, $option }) => {
        if (!$pressed) return theme.colors.gray200;
        if ($option === 'edit') return theme.colors.mainBlue;
        if ($option === 'close') return theme.colors.mainOrange;
        return theme.colors.mainOrange;
      }};
    }
  }
`;
