import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import styled from 'styled-components';

interface PhoneNumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhoneNumberInput = ({
  value,
  onChange,
}: PhoneNumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    const newEvent = {
      ...e,
      target: { ...e.target, value: formatted },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(newEvent);
  };
  return (
    <InputWrapper>
      <Label>
        <span>휴대전화</span>
        <span className="highlight"> *</span>
      </Label>
      <PlainInputBox
        width="100%"
        state="default"
        placeholder="휴대전화번호"
        guide=""
        value={value}
        onChange={handleChange}
        maxLength={13}
        inputMode="tel"
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 20px 0px 20px;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
