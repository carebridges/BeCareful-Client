import { styled } from 'styled-components';
import { ReactComponent as IconClose } from '@/assets/icons/IconClose.svg';
import { ReactComponent as LogoBlue } from '@/assets/icons/LogoBlue.svg';
import InputBox from '@/components/common/InputBox/InputBox';
import { ReactComponent as CheckBox } from '@/assets/icons/SquareCheck.svg';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { KakaoButton } from '@/components/common/Button/KakaoButton';
import { useIsIOS } from '@/hooks/useIsIOS';

const LoginPage = () => {
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();
  const isIOS = useIsIOS();

  const handleToggleAutoLogin = () => {
    setAutoLogin((prev) => !prev);
  };
  return (
    <>
      <IconContainer onClick={() => navigate(-1)}>
        <IconClose />
      </IconContainer>
      <LoginContainer>
        <InputForm>
          <LogoContainer>
            <StyledLogoBlue />
          </LogoContainer>
          <InputBox
            placeholder="예) 010-1234-5678"
            title={'휴대전화 번호'}
            titleVariant="small"
          />
          <InputBox
            placeholder="비밀번호 입력"
            width="240px"
            type="password"
            title={'비밀번호'}
            titleVariant="small"
          />
          <AutoLogin onClick={handleToggleAutoLogin} checked={autoLogin}>
            <CheckBox />
            자동로그인
          </AutoLogin>
        </InputForm>
        <SubmitContainer>
          <Button variant="blue" height="52px">
            로그인
          </Button>
          {!isIOS && <KakaoButton />}
        </SubmitContainer>
        <Gap />
        <Description>
          돌봄다리에 처음 오셨나요?
          <div className="gotosignup" onClick={() => navigate('/signup')}>
            회원가입
          </div>
        </Description>
      </LoginContainer>
    </>
  );
};

export default LoginPage;

const IconContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
`;

const StyledLogoBlue = styled(LogoBlue)`
  transform: scale(0.79);
  height: 48px;
  display: block;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const AutoLogin = styled.div<{ checked: boolean }>`
  display: flex;
  gap: 8px;

  svg {
    color: ${({ theme, checked }) =>
      checked ? theme.colors.mainBlue : theme.colors.gray300};
  }

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 24px 0px;
  width: 100%;
  box-sizing: border-box;
`;

const Gap = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const Description = styled.div`
  display: flex;
  padding-top: 24px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};

  .gotosignup {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

    margin-left: 4px;
    cursor: pointer;
    text-decoration: underline;
  }
`;
