import styled from 'styled-components';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';

interface ButtonProps {
  onClick: () => void;
  content?: string;
}

export const LogoutButton = ({ onClick, content }: ButtonProps) => {
  return (
    <Logout isRed={true} onClick={onClick}>
      <LogoutIcon />
      {content ? content : '로그아웃'}
    </Logout>
  );
};

export const ExpelButton = ({ onClick }: ButtonProps) => {
  return (
    <Logout isRed={false} onClick={onClick}>
      <LogoutIcon />
      탈퇴하기
    </Logout>
  );
};

const Logout = styled.div<{ isRed: boolean }>`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  color: ${({ theme, isRed }) =>
    isRed ? theme.colors.mainOrange : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
