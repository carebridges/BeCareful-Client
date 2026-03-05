import styled from 'styled-components';

interface ProgressDotsProps {
  index: number;
  total: number;
}

export const ProgressDots = ({ index, total }: ProgressDotsProps) => {
  const dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(<Dot key={i} active={i === index} />);
  }
  return <DotsWrapper>{dots}</DotsWrapper>;
};

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.coachMark : theme.colors.gray200};
  transition: background-color 0.3s ease;
`;
