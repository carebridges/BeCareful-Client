import { ReactComponent as ErrorIcon } from '@/assets/icons/socialworker/matching/YellowError.svg';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

type ErrorToastProps = {
  text: string;
};

export const ErrorToast = ({ text }: ErrorToastProps) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContainer $fade={fade}>
      <ErrorIcon />
      <ToastMessage>{text}</ToastMessage>
    </ToastContainer>
  );
};

const ToastContainer = styled.div<{ $fade: boolean }>`
  display: flex;
  padding: 16px;
  gap: 12px;
  align-items: flex-start;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray600};
  box-sizing: border-box;

  position: fixed;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  z-index: 999;

  opacity: ${({ $fade }) => ($fade ? 0 : 1)};
  transition: opacity 1.2s ease;
`;

const ToastMessage = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  white-space: nowrap;
`;
