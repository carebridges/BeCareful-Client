import styled from 'styled-components';
import { Button, PlainInputBox } from '@repo/ui';

interface NicknameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckDuplicate: () => void;
}

export const NicknameInput = ({
  value,
  onChange,
  onCheckDuplicate,
}: NicknameInputProps) => {
  return (
    <InputWrapper>
      <Label>
        <span>닉네임</span>
        <span className="highlight"> *</span>
      </Label>

      <NicknameInputRow>
        <PlainInputBox
          width="71%"
          state="default"
          placeholder="닉네임 입력"
          guide=""
          value={value}
          onChange={onChange}
        />
        <Button
          width="29%"
          variant="blue2"
          height="56px"
          style={{
            minWidth: '88px',
            flexShrink: 0,
            padding: '0 16px',
          }}
          onClick={onCheckDuplicate}
        >
          중복 확인
        </Button>
      </NicknameInputRow>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const NicknameInputRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;
