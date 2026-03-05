import styled from 'styled-components';
import { TooltipRenderProps } from 'react-joyride';
import { CAREGIVER_STEP_CONFIG } from '@/constants/tour';

export const CaregiverTourTooltip = ({ index, step }: TooltipRenderProps) => {
  const config =
    CAREGIVER_STEP_CONFIG[index as keyof typeof CAREGIVER_STEP_CONFIG] ||
    CAREGIVER_STEP_CONFIG[1];
  const isColumn = config.type === 'col';

  // 컨텐츠를 감싸는 컴포넌트 결정 (boxed 여부)
  const ContentWrapper = config.boxed ? BoxContent : DefaultContent;

  // 화살표 렌더링 함수
  const renderArrow = () => {
    if (!config.arrow) return null;
    return config.withMargin ? (
      <ArrowWithMargin>{config.arrow}</ArrowWithMargin>
    ) : (
      config.arrow
    );
  };

  return (
    <BaseContainer index={index} isColumn={isColumn}>
      {(config.arrowPos === 'left' || config.arrowPos === 'top') &&
        renderArrow()}

      <ContentWrapper>{step.content}</ContentWrapper>

      {(config.arrowPos === 'right' || config.arrowPos === 'bottom') &&
        renderArrow()}
    </BaseContainer>
  );
};

const BaseContainer = styled.div<{ index: number; isColumn?: boolean }>`
  display: flex;
  gap: 8px;
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')};
  align-items: ${({ index }) =>
    index === 1 || index === 5 ? 'flex-start' : 'center'};
  justify-content: center;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  span {
    color: ${({ theme }) => theme.colors.coachMark};
  }
`;

const ArrowWithMargin = styled.div`
  padding-top: 80px;
`;

const BoxContent = styled.div`
  padding: 10px 12px;
  border-radius: 20px;
  border: 1px dashed ${({ theme }) => theme.colors.coachMark};
`;

const DefaultContent = styled.div`
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
`;
