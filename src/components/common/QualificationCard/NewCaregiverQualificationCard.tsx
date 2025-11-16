import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { CertificateFormInput } from '@/types/CareGiverSignUp';
import { CertificateInfo } from '@/types/Caregiver/common';

interface CareGiverQualificationCardProps {
  initialType: string;
  onChange: (data: CertificateFormInput) => void;
  initialCert?: CertificateInfo;
}

export const NewCaregiverQualificationCard = ({
  initialType,
  onChange,
  initialCert,
}: CareGiverQualificationCardProps) => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateLevel] = useState('1급');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificateNumber(value);
    onChange({
      certificateType: initialType,
      certificateLevel,
      certificateNumber: value,
    });
  };

  useEffect(() => {
    setCertificateNumber(initialCert?.certificateNumber ?? '');
  }, [initialCert]);

  return (
    <CardContainer isFocused={isInputFocused}>
      <CardTopContainer>
        <CardHeader>
          <CardHeaderText>
            {initialType} <span>*</span>
          </CardHeaderText>
        </CardHeader>
        <CardMiddleText>자격증 번호 입력해 주세요.</CardMiddleText>
      </CardTopContainer>
      <CardBottomContainer>
        <QualificationCard>1급</QualificationCard>
        <CardInput
          type="text"
          placeholder="2025-1234567"
          value={certificateNumber}
          onChange={handleChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </CardBottomContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ isFocused: boolean }>`
  padding: 24px 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: ${({ theme, isFocused }) =>
    isFocused
      ? `2px solid ${theme.colors.mainBlue}`
      : `1px solid ${theme.colors.gray100}`};
  border-radius: 12px;
  background-color: white;
`;

const CardTopContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardHeaderText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const CardMiddleText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
`;

const CardBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const QualificationCard = styled.div`
  box-sizing: border-box;
  width: 56px;
  height: 52px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.mainBlue};

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.white};
`;

const CardInput = styled.input`
  padding: 8px 0;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  outline: none;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:focus {
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }
`;
