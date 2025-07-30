import { styled } from 'styled-components';
import { ReactComponent as IconCheckCircle } from '@/assets/icons/IconCheckCircle.svg';
import { useState } from 'react';
import { CertificateFormInput } from '@/types/CareGiverSignUp';

type CardState = 'default' | 'focus' | 'check';

interface CareGiverQualificationCardProps {
  initialType: string;
  onChange: (data: CertificateFormInput) => void;
}

export const CareGiverQualificationCard = ({
  initialType,
  onChange,
}: CareGiverQualificationCardProps) => {
  const [cardState, setCardState] = useState<CardState>('default');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateLevel] = useState('1급');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificateNumber(value);
    onChange({
      certificateType: initialType,
      certificateLevel,
      certificateNumber: value,
    });
  };

  return (
    <CardContainer state={cardState} onClick={() => setCardState('focus')}>
      <CardTopContainer>
        <CardHeader>
          <CardHeaderText state={cardState}>
            {initialType} <span>*</span>
          </CardHeaderText>
          <IconWrapper
            state={cardState}
            onClick={(e) => {
              e.stopPropagation();
              setCardState('check');
            }}
          >
            <IconCheckCircle />
          </IconWrapper>
        </CardHeader>
        <CardMiddleText state={cardState}>
          자격증 번호 입력해 주세요.
        </CardMiddleText>
      </CardTopContainer>
      <CardBottomContainer>
        <QualificationCard state={cardState}>1급</QualificationCard>
        <CardInput
          state={cardState}
          type="text"
          value={certificateNumber}
          onChange={handleChange}
        />
      </CardBottomContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ state: CardState }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 20px;
  width: 100%;
  border-radius: 12px;
  border: ${({ state, theme }) => {
    switch (state) {
      case 'focus':
        return `1px solid ${theme.colors.mainBlue}`;
      case 'check':
        return `2px solid ${theme.colors.mainBlue}`;
      default:
        return `1px solid ${theme.colors.gray100}`;
    }
  }};
  box-sizing: border-box;
  background-color: ${({ state, theme }) =>
    state === 'focus' ? theme.colors.mainBlue : 'white'};
`;

const CardTopContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const CardMiddleText = styled.div<{ state: CardState }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, state }) =>
    state === 'focus' ? theme.colors.white : theme.colors.gray500};
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const IconWrapper = styled.div<{ state: CardState }>`
  display: flex;
  align-items: center;
  justify-content: center;
  path {
    fill: ${({ theme, state }) =>
      state === 'focus'
        ? theme.colors.white
        : state === 'check'
          ? theme.colors.mainBlue
          : theme.colors.gray200};
  }
`;

const CardHeaderText = styled.div<{ state: CardState }>`
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, state }) =>
    state === 'focus' ? theme.colors.white : theme.colors.gray900};
  span {
    color: ${({ theme, state }) =>
      state === 'focus' ? theme.colors.white : theme.colors.mainBlue};
  }
`;

const CardInput = styled.input<{ state: CardState }>`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: 8px 0;
  outline: none;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, state }) =>
    state === 'focus' ? theme.colors.white : theme.colors.gray300};
  background-color: ${({ state, theme }) =>
    state === 'focus' ? theme.colors.mainBlue : theme.colors.white};
`;

const QualificationCard = styled.div<{ state: CardState }>`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 52px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${({ theme, state }) =>
    state === 'focus' ? theme.colors.white : theme.colors.mainBlue};
  color: ${({ theme, state }) =>
    state === 'focus' ? theme.colors.mainBlue : theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
