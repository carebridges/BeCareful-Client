import styled from 'styled-components';

interface SecretInputBoxProps {
  width: string;
  state: string;
  placeholder: string;
  guide: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  masked?: boolean;
}

export const SecretInputBox = ({
  width,
  state,
  placeholder,
  guide,
  value = '',
  onChange,
  masked = true,
}: SecretInputBoxProps) => {
  return (
    <InputWrapper width={width}>
      <InputContainer>
        <InputDefault
          type={masked ? 'password' : 'text'}
          placeholder={placeholder}
          state={state}
          value={value}
          onChange={onChange}
        />
      </InputContainer>
      {guide && (
        <InputGuideWrapper>
          <InputGuideLabel state={state}>{guide}</InputGuideLabel>
        </InputGuideWrapper>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ width }) => width || '100%'};
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputDefault = styled.input<{ state: string }>`
  height: 52px;
  padding: 15px 16px;
  box-sizing: border-box;
  text-align: left;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;
  caret-color: ${({ theme }) => theme.colors.gray900};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 40px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
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
