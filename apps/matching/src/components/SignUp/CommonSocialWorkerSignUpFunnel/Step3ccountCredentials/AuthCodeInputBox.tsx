import styled from 'styled-components';

interface AuthCodeInputBoxProps {
  width: string;
  state: string;
  placeholder: string;
  guide: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suffix?: React.ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number;
  type?: string;
}

export const AuthCodeInputBox = ({
  width,
  state,
  placeholder,
  value,
  suffix,
  onChange,
  onKeyDown,
  inputMode,
  maxLength,
  type = 'text',
}: AuthCodeInputBoxProps) => {
  return (
    <InputWrapper width={width}>
      <InputDefault
        type={type}
        placeholder={placeholder}
        state={state}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputMode={inputMode}
        maxLength={maxLength}
      ></InputDefault>
      {suffix && <SuffixWrapper>{suffix}</SuffixWrapper>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ width }) => (width ? width : '100%')};
  position: relative;
`;

const InputDefault = styled.input<{ state: string }>`
  height: 22px;
  padding: 15px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme, state }) => {
    switch (state) {
      case 'error':
        return theme.colors.negative;
      case 'success':
        return theme.colors.positive;
      default:
        return theme.colors.gray100;
    }
  }};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const SuffixWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;
