import {
  Label,
  RadioButton,
  RadioButtonWrapper,
  RadioWrapper,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';

interface PetSectionProps {
  pet: '있음' | '없음' | '';
  onChange: (value: '있음' | '없음') => void;
}

export function PetSection({ pet, onChange }: PetSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">애완동물</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <RadioWrapper>
        <RadioButtonWrapper>
          <RadioButton
            type="radio"
            id="petT"
            name="pet"
            checked={pet === '있음'}
            onChange={() => onChange('있음')}
          />
          <Label htmlFor="petT">있음</Label>
        </RadioButtonWrapper>
        <RadioButtonWrapper>
          <RadioButton
            type="radio"
            id="petF"
            name="pet"
            checked={pet === '없음'}
            onChange={() => onChange('없음')}
          />
          <Label htmlFor="petF">없음</Label>
        </RadioButtonWrapper>
      </RadioWrapper>
    </SectionWrapper>
  );
}
