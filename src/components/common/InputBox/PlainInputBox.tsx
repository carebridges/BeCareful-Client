import styled from 'styled-components';

interface PlainInputBoxProps {
  width: string;
  state: string;
  placeholder: string;
  guide: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suffix?: React.ReactNode;
}

export const PlainInputBox = ({
  width,
  state,
  placeholder,
  guide,
  value,
  onChange,
  onKeyDown,
  suffix,
}: PlainInputBoxProps) => {
  return (
    <InputWrapper width={width}>
      <InputDefault
        type="number"
        placeholder={placeholder}
        state={state}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      ></InputDefault>
      {guide === '' ? (
        <></>
      ) : (
        <InputGuideWrapper>
          <InputGuideLabel state={state}>{guide}</InputGuideLabel>
        </InputGuideWrapper>
      )}
      {suffix && (
        <div style={{ position: 'absolute', right: '12px', color: 'red' }}>
          {suffix}
        </div>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ width }) => (width ? width : '100%')};
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

const InputGuideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const InputGuideLabel = styled.p<{ state: string }>`
  color: ${({ theme, state }) => {
    switch (state) {
      case 'error':
        return theme.colors.negative;
      case 'success':
        return theme.colors.positive;
      default:
        return theme.colors.gray500;
    }
  }};

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.35px;
`;
