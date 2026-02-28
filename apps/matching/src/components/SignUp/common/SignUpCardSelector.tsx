import { CareGiverCard } from '@/components/SignUp/common/CareGiverCard';
import { InstitutionCard } from '@/components/SignUp/common/InstitutionCard';
import { styled } from 'styled-components';

export type CardType = 'caregiver' | 'institution';

interface Props {
  pressed: CardType | null;
  onSelect: (type: CardType) => void;
}

const cards = [
  { key: 'caregiver', Card: CareGiverCard },
  { key: 'institution', Card: InstitutionCard },
] as const;

export const SignUpCardSelector = ({ pressed, onSelect }: Props) => (
  <CardContainer>
    {cards.map(({ key, Card }) => (
      <div key={key} onClick={() => onSelect(key)}>
        <Card pressed={pressed === key} />
      </div>
    ))}
  </CardContainer>
);

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;
`;
