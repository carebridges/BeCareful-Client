import {
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { formatBirthDate } from '@/utils/format/text';
import { PlainInputBox } from '@repo/ui';

interface BirthInputSectionProps {
  birth: string;
  onChange: (value: string) => void;
}

export function BirthInputSection({ birth, onChange }: BirthInputSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthDate(e.target.value);
    onChange(formatted);
  };
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">생년월일</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>

      <PlainInputBox
        width="100%"
        state="default"
        placeholder="예) 1978-05-08"
        guide=""
        value={birth}
        onChange={handleChange}
        maxLength={10}
      />
    </SectionWrapper>
  );
}
