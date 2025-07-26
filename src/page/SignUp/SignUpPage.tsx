import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useState } from 'react';

import { Button } from '@/components/common/Button/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  CardType,
  SignUpCardSelector,
} from '@/components/SignUp/common/SignUpCardSelector';

export const SignUpPage = () => {
  const [cardPressed, setCardPressed] = useState<CardType | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guestKey = searchParams.get('guestKey');

  const handleNextStep = () => {
    if (!cardPressed) return;
    navigate(`/signup/${cardPressed}?guestKey=${guestKey}&role=${cardPressed}`);
  };

  return (
    <PageLayout>
      <ContentWrapper>
        <BackButtonWrapper>
          <IconArrowLeft onClick={() => navigate('/onboarding')} />
        </BackButtonWrapper>
        <Header>
          환영합니다!
          <>
            <span className="highlight">회원 유형을 선택</span>
            <span>하세요</span>
          </>
        </Header>
        <SignUpCardSelector pressed={cardPressed} onSelect={setCardPressed} />
        <FooterButtonBar>
          <Button
            variant={cardPressed ? 'blue' : 'disabled'}
            height="52px"
            onClick={handleNextStep}
            disabled={!cardPressed}
          >
            다음 단계로 이동
          </Button>
        </FooterButtonBar>
      </ContentWrapper>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 135px;
  margin: 0px 16px auto 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 16px 20px 0px 0px;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const FooterButtonBar = styled.div`
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
