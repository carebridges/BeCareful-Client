import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import styled from 'styled-components';

interface PasswordConfirmInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordConfirmInput = ({
  value,
  onChange,
}: PasswordConfirmInputProps) => {
  return (
    <InputWrapper>
      <Label>
        <span>비밀번호 확인</span>
        <span className="highlight"> *</span>
      </Label>
      <PlainInputBox
        width="100%"
        state="default"
        placeholder="비밀번호 재입력"
        guide=""
        value={value}
        onChange={onChange}
        maxLength={12}
        type="password"
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
