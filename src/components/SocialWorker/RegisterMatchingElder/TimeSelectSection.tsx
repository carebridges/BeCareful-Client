import styled from 'styled-components';
import { TimeDropdown } from '@/components/common/Dropdown/TimeDropdown'; //TODO 드롭다운 수정

interface Props {
  startTime: string;
  endTime: string;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;
}

export const TimeSelectSection = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}: Props) => {
  return (
    <TitleContainer>
      <div className="name">
        <span>근무시간</span>
        <span className="highlight">*</span>
      </div>
      <SectionGuide>
        선택한 모든 요일은 동일한 시간으로만 설정됩니다.
        <br />
        예) 월, 수 -&gt; 모든 오후 2-5시
      </SectionGuide>

      <TimeBoxContainer>
        <TimeDropdown
          width="50%"
          value={startTime || '00:00'}
          onChange={(time: string) => setStartTime(time)}
        />
        ~
        <TimeDropdown
          width="50%"
          value={endTime || '00:00'}
          onChange={(time: string) => setEndTime(time)}
        />
      </TimeBoxContainer>
    </TitleContainer>
  );
};

const SectionGuide = styled.label`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 40px 20px 0px 20px;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  box-sizing: border-box;
  flex-direction: column;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .name {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
`;

const TimeBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
