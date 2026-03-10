import { KakaoButton } from '@/components/common/Button/KakaoButton';
import { ReactComponent as LogoBlue } from '@/assets/icons/LogoBlue.svg';
import { styled } from 'styled-components';

export const OnboardingPage = () => {
  return (
    <>
      <IntroduceContainer>
        <TopText>
          우리 동내
          <br />
          <span>요양보호사 구인구직</span>
        </TopText>
        <LogoBlue />
        <BottomText>
          내가 찾던 일자리,
          <br />
          우리 센터에 딱 맞는 선생님
          <br />
          <span>지금 바로 확인하세요</span>
        </BottomText>
      </IntroduceContainer>

      <ButtonContainer>
        <KakaoButton />
      </ButtonContainer>
    </>
  );
};

const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  padding: 0 20px;
  margin-top: 133px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  margin-top: 185px;
  background: ${({ theme }) => theme.colors.white};
`;

const TopText = styled.h1`
  padding-bottom: 9px;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 26px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  span {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const BottomText = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  margin-top: 15px;

  span {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
