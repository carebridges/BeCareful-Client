import {
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { PlainInputBox } from '@repo/ui';

interface NameInputSectionProps {
  name: string;
  onChange: (value: string) => void;
}

export function NameInputSection({ name, onChange }: NameInputSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">이름</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <PlainInputBox
        width="100%"
        state="default"
        placeholder="이름 입력"
        guide=""
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </SectionWrapper>
  );
}
