import styled from 'styled-components';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import { DAY_LABELS } from '@/constants/socialworker/day.socialWorker';

interface Props {
  selectedDays: string[];
  onToggle: (day: string) => void;
}

export const DaySelectSection = ({ selectedDays, onToggle }: Props) => {
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">희망 근무요일</SectionTitle>
        <SectionTitle color="blue">*</SectionTitle>
      </SectionTitleWrapper>
      <SectionGuide>중복선택 가능</SectionGuide>
      <SelectWrapper gap="4px">
        {DAY_LABELS.map((day) => (
          <CheckBoxSelect
            key={day}
            id={day}
            label={day}
            checked={selectedDays.includes(day)}
            onChange={onToggle}
            width="100%"
            height="42px"
          />
        ))}
      </SelectWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 20px 0px 20px;
  gap: 8px;
`;
const SectionTitle = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const SectionGuide = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
const SelectWrapper = styled.div<{ gap: string }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => (gap ? gap : '8px')};
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;
