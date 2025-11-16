import styled from 'styled-components';
import { MatchingCareCard } from '@/page/Matching/MatchingCareCard';
import { MATCHING_CARE_TYPE_OPTIONS } from '@/constants/socialworker/careTypes.socialWorker';

interface Props {
  selectedCareTypes: string[];
  onChange: (careType: string) => void;
}

export const CareTypeSection = ({ selectedCareTypes, onChange }: Props) => {
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">케어항목</SectionTitle>
        <SectionTitle color="blue">*</SectionTitle>
      </SectionTitleWrapper>
      <SectionGuide>여러 개 선택 가능</SectionGuide>
      {MATCHING_CARE_TYPE_OPTIONS.map(({ key, title, icon: Icon }) => (
        <MatchingCareCard
          key={key}
          title={title}
          Icon={Icon}
          initialChecked={selectedCareTypes.includes(key)}
          onChange={() => onChange(key)}
        />
      ))}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 20px 0px 20px;
  gap: 8px;
  box-sizing: border-box;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
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
