import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import styled from 'styled-components';

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameInput = ({ value, onChange }: NameInputProps) => {
  return (
    <InputWrapper>
      <Label>
        <span>이름</span>
        <span className="highlight"> *</span>
      </Label>
      <PlainInputBox
        width="100%"
        state="default"
        placeholder="이름"
        guide=""
        value={value}
        onChange={onChange}
        maxLength={10}
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
