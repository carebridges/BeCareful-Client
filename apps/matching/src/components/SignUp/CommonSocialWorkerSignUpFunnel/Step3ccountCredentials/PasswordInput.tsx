import styled from 'styled-components';
import { PlainInputBox } from '@repo/ui';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  return (
    <InputWrapper>
      <Label>
        <span>비밀번호</span>
        <span className="highlight"> *</span>
      </Label>
      <PlainInputBox
        width="100%"
        state="default"
        placeholder="비밀번호 입력"
        value={value}
        onChange={onChange}
        maxLength={12}
        type="password"
        guide={''}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
