import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '@/assets/icons/CloseCircle.svg';
import { SmallDropdown } from '@/components/common/Dropdown/SmallDropdown';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { CertificateFormInput } from '@/types/CareGiverSignUp';
import { CertificateInfo } from '@/types/Caregiver/common';

interface NursingQualificationCardProps {
  initialType: string;
  onChange: (data: CertificateFormInput) => void;
  initialCert?: CertificateInfo;
  onDelete?: () => void;
}

export const NewNursingQualificationCard = ({
  initialType,
  onChange,
  initialCert,
  onDelete,
}: NursingQualificationCardProps) => {
  const [certificateType] = useState(initialType);
  const [certificateLevel, setCertificateLevel] = useState('1급');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const smallDropContents = ['1급', '2급'];
  const dropContents = ['시•도청', '보건복지부'];
  const [selectedDropContents, setSelectedDropContents] = useState<string[]>(
    [],
  );

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

  useEffect(() => {
    setCertificateNumber(initialCert?.certificateNumber ?? '');
    setCertificateLevel(initialCert?.grade === 'SECOND' ? '2급' : '1급');
  }, [initialCert]);

  return (
    <CardContainer isFocused={isInputFocused}>
      <CardTopContainer>
        <CardHeader>
          <CardHeaderText>
            {certificateType} <span>*</span>
          </CardHeaderText>
          <Close onClick={onDelete} />
        </CardHeader>
        <CardMiddleText>자격증 번호 입력해 주세요.</CardMiddleText>
      </CardTopContainer>

      <Dropdown
        title="시•도청"
        contents={dropContents}
        selectedContents={selectedDropContents}
        setSelectedContents={setSelectedDropContents}
      />

      <CardBottomContainer>
        <SmallDropdown
          title="1급"
          contents={smallDropContents}
          selectedContents={[certificateLevel]}
          setSelectedContents={handleLevelChange}
        />
        <CardInput
          type="text"
          placeholder="2025-12345 (선택)"
          value={certificateNumber}
          onChange={handleNumberChange}
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

const Close = styled(CloseIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
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
