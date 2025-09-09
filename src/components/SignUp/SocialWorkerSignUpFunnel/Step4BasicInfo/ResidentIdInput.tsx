import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { SecretInputBox } from '@/components/common/InputBox/SecretInputBox';
import styled from 'styled-components';

interface ResidentIdInputProps {
  birthDate: string;
  genderInput: string;
  onBirthDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditProfile?: boolean;
}

export const ResidentIdInput = ({
  birthDate,
  genderInput,
  onBirthDateChange,
  onGenderChange,
  isEditProfile = false,
}: ResidentIdInputProps) => {
  return (
    <InputWrapper $isEditProfile={isEditProfile}>
      <Label $isEditProfile={isEditProfile}>
        <span>주민등록번호</span>
        <span className="highlight"> *</span>
      </Label>
      <ResidentWrapper>
        <PlainInputBox
          width="45%"
          state="default"
          placeholder="주민등록번호"
          guide=""
          value={birthDate}
          onChange={onBirthDateChange}
          maxLength={6}
          inputMode="numeric"
        />
        -
        <SecretInputBox
          width="25%"
          state="default"
          placeholder=""
          guide=""
          value={genderInput}
          masked={true}
          onChange={onGenderChange}
          maxLength={1}
          inputMode="numeric"
        />
        <CircleWrapper>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} />
          ))}
        </CircleWrapper>
      </ResidentWrapper>
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ $isEditProfile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ $isEditProfile }) =>
    $isEditProfile ? '16px 0px 0px 0px' : '16px 20px 0px 20px'};
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

const Label = styled.div<{ $isEditProfile: boolean }>`
  font-size: ${({ theme, $isEditProfile }) =>
    $isEditProfile
      ? theme.typography.fontSize.body1
      : theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ResidentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  flex-grow: 1;
`;

const CircleWrapper = styled.div`
  display: flex;
  margin-left: 8px;
  gap: 4px;

  & > div {
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.gray600};
    border-radius: 50%;
  }

  width: 50%;
  justify-content: space-between;
  align-items: center;
`;
