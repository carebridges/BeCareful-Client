import {
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { PlainInputBox } from '@repo/ui';

interface HealthConditionSectionProps {
  healthCondition: string;
  onChange: (value: string) => void;
}

export function HealthConditionSection({
  healthCondition,
  onChange,
}: HealthConditionSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">건강상태</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>

      <PlainInputBox
        width="100%"
        state="default"
        placeholder="예) 당뇨, 신장질환"
        guide=""
        value={healthCondition}
        onChange={(e) => onChange(e.target.value)}
      />
    </SectionWrapper>
  );
}
