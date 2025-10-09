import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { useCallback } from 'react';
import styled from 'styled-components';

interface PhoneNumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  locked?: boolean;
}

export const PhoneNumberInput = ({
  value,
  onChange,
  locked = true,
}: PhoneNumberInputProps) => {
  const blockEvent = useCallback(
    (e: React.SyntheticEvent) => {
      if (!locked) return;
      e.preventDefault();
      e.stopPropagation();
    },
    [locked],
  );

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
        onChange={locked ? undefined : onChange}
        maxLength={13}
        inputMode="tel"
        onKeyDown={locked ? blockEvent : undefined}
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
