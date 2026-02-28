import {
  Label,
  RadioButton,
  RadioButtonWrapper,
  RadioWrapper,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';

interface InmateSectionProps {
  inmate: '있음' | '없음' | '';
  onChange: (value: '있음' | '없음') => void;
}

export function InmateSection({ inmate, onChange }: InmateSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">동거가족</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <RadioWrapper>
        <RadioButtonWrapper>
          <RadioButton
            type="radio"
            id="inmateT"
            name="inmate"
            checked={inmate === '있음'}
            onChange={() => onChange('있음')}
          />
          <Label htmlFor="inmateT">있음</Label>
        </RadioButtonWrapper>
        <RadioButtonWrapper>
          <RadioButton
            type="radio"
            id="inmateF"
            name="inmate"
            checked={inmate === '없음'}
            onChange={() => onChange('없음')}
          />
          <Label htmlFor="inmateF">없음</Label>
        </RadioButtonWrapper>
      </RadioWrapper>
    </SectionWrapper>
  );
}
