import styled from 'styled-components';
import { colors } from '@/style/theme/color';

type ColorKey = keyof typeof colors;

const colorMap = {
  green: { bg: 'subGreen', fg: 'mainGreen' },
  gray: { bg: 'gray50', fg: 'gray500' },
  blue: { bg: 'subBlue', fg: 'mainBlue' },
  orange: { bg: 'subOrange', fg: 'mainOrange' },
} as const;

type TagColor = keyof typeof colorMap;

const getColorByStatus = (status: string): TagColor => {
  switch (status) {
    case '조율중':
      return 'green';
    case '매칭중':
      return 'gray';
    case '매칭 완료':
      return 'blue';
    case '공고마감':
      return 'orange';
    default:
      return 'gray';
  }
};

interface StatusTagProps {
  status: string;
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const color = getColorByStatus(status);
  const { bg, fg } = colorMap[color];

  return (
    <State $bg={bg} $fg={fg}>
      <div className="circle" />
      <span className="text">{status}</span>
    </State>
  );
};

const State = styled.div<{ $bg: ColorKey; $fg: ColorKey }>`
  display: flex;
  width: fit-content;
  height: 26px;
  padding: 4px 8px;
  box-sizing: border-box;

  gap: 4px;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme, $bg }) => theme.colors[$bg]};

  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme, $fg }) => theme.colors[$fg]};
  }

  .text {
    color: ${({ theme, $fg }) => theme.colors[$fg]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }
`;
