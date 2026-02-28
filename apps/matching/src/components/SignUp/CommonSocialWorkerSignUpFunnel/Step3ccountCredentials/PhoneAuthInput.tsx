import styled from 'styled-components';
import { AuthCodeInputBox } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/AuthCodeInputBox';
import { Button, PlainInputBox, theme } from '@repo/ui';

interface PhoneAuthInputProps {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  authCode: string;
  onAuthCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendCode: () => void;
  sendButtonLabel: string;
  remainTimeText?: string;
}

export const PhoneAuthInput = ({
  phoneNumber,
  onPhoneNumberChange,
  authCode,
  onAuthCodeChange,
  onSendCode,
  sendButtonLabel,
}: PhoneAuthInputProps) => {
  return (
    <InputWrapper>
      <Label>
        <span>휴대전화 번호</span>
        <span className="highlight"> *</span>
      </Label>

      <Row>
        <PlainInputBox
          width="71%"
          state="default"
          placeholder="예) 01012345678"
          guide=""
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          inputMode="tel"
          maxLength={13}
        />
        <Button width="29%" variant="blue2" height="56px" onClick={onSendCode}>
          {sendButtonLabel}
        </Button>
      </Row>

      <AuthCodeRow>
        <AuthCodeInputBox
          width="100%"
          state="default"
          placeholder="인증번호 6자리"
          guide=""
          value={authCode}
          onChange={onAuthCodeChange}
          inputMode="numeric"
          maxLength={6}
          suffix={
            <span style={{ color: theme.colors.negative }}>남은시간 02:31</span>
          }
        />
      </AuthCodeRow>
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

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const AuthCodeRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 8px;
`;
