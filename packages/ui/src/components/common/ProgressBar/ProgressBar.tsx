'use client';
import { styled } from 'styled-components';

type ProgressBarProps = {
  percent: number;
};

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarContainer>
        <ProgressBarFill percent={percent} />
      </ProgressBarContainer>
    </ProgressBarWrapper>
  );
};

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const ProgressBarFill = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  transition: width 0.3s ease;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
`;
