'use client';
import { styled } from 'styled-components';
import IconCheckCircle from '../../../assets/icons/IconCheckCircle.svg';
import { useState } from 'react';
import { SmallDropdown } from '../Dropdown';
import { CertificateFormInput } from '@repo/common';

type CardState = 'default' | 'focus' | 'check';

interface SocialQualificationCardProps {
  initialType: string;
  onChange: (data: CertificateFormInput) => void;
}

export const SocialQualificationCard = ({
  initialType,
  onChange,
}: SocialQualificationCardProps) => {
  const [cardState, setCardState] = useState<CardState>('default');
  const [certificateType] = useState(initialType);
  const [certificateLevel, setCertificateLevel] = useState('1급');
  const [certificateNumber, setCertificateNumber] = useState('');

  const smallDropContents = ['1급', '2급'];

  const handleLevelChange = (values: string[]) => {
    const newLevel = values[0] || '';
    setCertificateLevel(newLevel);
    onChange({
      certificateType,
      certificateLevel: newLevel,
      certificateNumber,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setCertificateNumber(newNumber);
    onChange({
      certificateType,
      certificateLevel,
      certificateNumber: newNumber,
    });
  };

  return (
    <CardContainer state={cardState} onClick={() => setCardState('focus')}>
      <CardTopContainer>
        <CardHeader>
          <CardHeaderText state={cardState}>
            {certificateType} <span>*</span>
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
        <SmallDropdown
          title="1급"
          contents={smallDropContents}
          selectedContents={[certificateLevel]}
          setSelectedContents={handleLevelChange}
          pressed={cardState === 'focus'}
        />
        <CardInput
          state={cardState}
          type="text"
          value={certificateNumber}
          onChange={handleNumberChange}
        />
      </CardBottomContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ state: CardState }>`
  display: flex;
  width: 100%;
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
  width: 100%;
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
    color: ${({ theme }) => theme.colors.mainBlue};
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
    state === 'focus'
      ? theme.colors.white
      : state === 'check'
        ? theme.colors.gray900
        : theme.colors.gray300};
  background-color: ${({ state, theme }) =>
    state === 'focus' ? theme.colors.mainBlue : theme.colors.white};
`;
