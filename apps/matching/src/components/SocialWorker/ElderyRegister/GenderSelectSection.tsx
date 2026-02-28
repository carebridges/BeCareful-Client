import {
  Label,
  RadioButton,
  RadioButtonWrapper,
  RadioWrapper,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';

interface GenderSelectSectionProps {
  gender: 'MALE' | 'FEMALE' | '';
  onChange: (value: 'MALE' | 'FEMALE') => void;
}

export function GenderSelectSection({
  gender,
  onChange,
}: GenderSelectSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">성별</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <RadioWrapper>
        <RadioButtonWrapper>
          <RadioButton
            type="radio"
            id="MALE"
            name="gender"
            checked={gender === 'MALE'}
            onChange={() => onChange('MALE')}
          />
          <Label htmlFor="MALE">남성</Label>
        </RadioButtonWrapper>
        <RadioButtonWrapper>
          <RadioButton
            type="radio"
            id="FEMALE"
            name="gender"
            checked={gender === 'FEMALE'}
            onChange={() => onChange('FEMALE')}
          />
          <Label htmlFor="FEMALE">여성</Label>
        </RadioButtonWrapper>
      </RadioWrapper>
    </SectionWrapper>
  );
}
