import { useState } from 'react';
import { styled } from 'styled-components';
import { PasswordConfirmInput } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/PasswordConfirmInput';
import { PasswordInput } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/PasswordInput';
import { PhoneAuthInput } from '@/components/SignUp/CommonSocialWorkerSignUpFunnel/Step3ccountCredentials/PhoneAuthInput';
import { PASSWORD_RULE_TEXT } from '@/constants/auth';
import { isValidPassword } from '@/hooks/SignUp/usePasswordValidation';
import { useCommonCaregiverSignUpContext } from '@/contexts/CommonCaregiverSignUpContext';
import { Button } from '@repo/ui';

export const Step1AccountCredentials = () => {
  const { goToNext, goToPrev } = useCommonCaregiverSignUpContext();

  //임시 코드 api 나오면 수정 예정
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const passwordRuleOk = isValidPassword(password);
  const hasPwInput = password.length > 0;

  const hasConfirmInput = passwordConfirm.length > 0;
  const isMatch = password.length > 0 && password === passwordConfirm;

  const isFormValid =
    phoneNumber.length > 0 &&
    authCode.length === 6 &&
    passwordRuleOk &&
    hasConfirmInput &&
    isMatch;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          로그인에 사용하실
          <br />
          전화번호/비밀번호를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
      </HeaderSection>

      <PhoneAuthInput
        phoneNumber={phoneNumber}
        onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
        authCode={authCode}
        onAuthCodeChange={(e) => setAuthCode(e.target.value)}
        onSendCode={() => {}}
        sendButtonLabel="인증번호 전송"
        remainTimeText="남은시간 02:59"
      />

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {hasPwInput && (
        <ValidationMessage state={passwordRuleOk ? 'success' : 'error'}>
          {PASSWORD_RULE_TEXT}
        </ValidationMessage>
      )}

      <PasswordConfirmInput
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      {hasConfirmInput && (
        <ValidationMessage state={isMatch ? 'success' : 'error'}>
          {isMatch
            ? '* 비밀번호가 일치합니다.'
            : '* 비밀번호가 일치하지 않습니다.'}
        </ValidationMessage>
      )}

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          height="52px"
          variant={isFormValid ? 'blue' : 'gray'}
          disabled={!isFormValid}
        >
          다음
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 112px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;

const ValidationMessage = styled.p<{ state: 'default' | 'error' | 'success' }>`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  margin-top: 8px;
  color: ${({ theme, state }) =>
    state === 'error' ? theme.colors.mainOrange : theme.colors.mainBlue};
`;
