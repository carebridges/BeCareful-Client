'use client';

import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import { ReactComponent as LogoBlue } from '../assets/icons/LogoBlue.svg';
interface SplashPageProps {
  onComplete: () => void;
}

export const SplashPage = ({ onComplete }: SplashPageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Icon>
        <LogoBlue />
      </Icon>
      <Label>돌봄을 잇다, 마음을 잇다</Label>
    </Container>
  );
};

const fadeOut = keyframes`
  0% {
    opacity : 1;
  }
  100% {
   opacity : 0;
  } 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 16px;
  justify-content: center;
  align-items: center;

  animation: ${fadeOut} 2s ease-in-out both;
`;

const Icon = styled.div`
  width: 160px;
  height: 48px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
