import styled from 'styled-components';
import { colors } from '@/style/theme/color';

type ColorKey = keyof typeof colors;

const bgColor: ColorKey = 'subBlue'; //TOOD
const textColor: ColorKey = 'mainBlue'; //TODO

interface TagProps {
  label: string;
}

export const Tag = ({ label }: TagProps) => {
  return (
    <TagWrapper $bg={bgColor} $fg={textColor}>
      <span className="text">{label}</span>
    </TagWrapper>
  );
};

const TagWrapper = styled.div<{ $bg: ColorKey; $fg: ColorKey }>`
  width: fit-content;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme, $bg }) => theme.colors[$bg]};

  .text {
    color: ${({ theme, $fg }) => theme.colors[$fg]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }
`;
