import { KakaoButton } from '@/components/common/Button/KakaoButton';
import { ReactComponent as LogoBlue } from '@/assets/icons/LogoBlue.svg';
import { styled } from 'styled-components';

export const OnboardingPage = () => {
  return (
    <>
      <IntroduceContainer>
        <TopText>
          요양보호사 <strong>구인구직</strong>과
          <br />
          <strong>정보 공유</strong>를 한번에
        </TopText>
        <LogoBlue />
        <BottomText>
          센터 운영에 꼭 필요한 정보와 소통,
          <br />
          돌봄다리에 다 있어요.
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
`;

const TopText = styled.h1`
  padding-bottom: 9px;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 26px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const BottomText = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  margin-top: 15px;
`;
