'use client';
import { styled } from 'styled-components';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <ToggleContainer onClick={onChange}>
      <ToggleLabel checked={checked}></ToggleLabel>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  cursor: pointer;
`;

const ToggleLabel = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.mainBlue : theme.colors.gray300};
  border-radius: 25px;
  transition: background-color 0.3s;

  &::before {
    position: absolute;
    content: '';
    height: 24px;
    width: 24px;
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    transition: transform 0.3s;
    transform: ${({ checked }) =>
      checked ? 'translateX(24px)' : 'translateX(0)'};
  }
`;
