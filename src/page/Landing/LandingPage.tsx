import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import BackgroundIcon from '@/assets/icons/landing/Background.svg';
import { ReactComponent as AssoLogo } from '@/assets/icons/landing/AssociationLogo.svg';
import { ReactComponent as AssoLogoM } from '@/assets/icons/landing/AssociationLogoM.svg';
import { ReactComponent as Logo } from '@/assets/icons/landing/Logo.svg';
import { ReactComponent as LogoBlack } from '@/assets/icons/landing/LogoBlack.svg';
import AssociationInfoSection from '@/components/Landing/AssociationInfoSection';
import CommunityGuideSection from '@/components/Landing/CommunityGuideSection';
import Footer from '@/components/Landing/Footer';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { mobile } from '@/utils/mobileStyle';

const LandingPage = () => {
  const isMobile = useIsMobile();

  const { handleNavigate } = useHandleNavigate();
  const handleToCommunity = () => {
    handleNavigate('/community/splash');
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const landingRef = useRef<HTMLDivElement>(null);
  const scrollToAssociation = () => {
    if (landingRef.current) {
      const offset = isMobile ? 606 : 650;
      const associationGuide = landingRef.current.offsetTop + offset;
      window.scrollTo({ top: associationGuide, behavior: 'smooth' });
    }
  };

  return (
    <Container ref={landingRef}>
      {isMobile ? (
        <Header isScrolled={isScrolled}>
          <AssoLogoM />
        </Header>
      ) : (
        <Header isScrolled={isScrolled}>
          <AssoLogo />
          <HeaderRight onClick={handleToCommunity}>
            {isScrolled ? <LogoBlack /> : <Logo />}
            커뮤니티 바로가기
          </HeaderRight>
        </Header>
      )}

      <Background src={BackgroundIcon} />

      <MainBanner>
        <div className="labels">
          <label className="title">
            함께 성장하는 요양 기관
            <br />
            네트워크
          </label>
          <label className="detail">전주완주 장기요양 기관 협회</label>
          <label className="eng">JEONJU WANJU SENIOR LONGTERMCARE</label>
        </div>
        <div className="buttons">
          <button className="community" onClick={handleToCommunity}>
            커뮤니티 바로가기
          </button>
          <button className="asso" onClick={scrollToAssociation}>
            협회 소개 보기
          </button>
        </div>
      </MainBanner>

      <AssociationInfoSection />

      <CommunityGuideSection />

      <Footer />
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const Header = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 20px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  transition: background-color 0.5s ease;

  ${(props) =>
    props.isScrolled &&
    css`
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.black};
    `}

  ${mobile(css`
    font-size: 14px;
    padding: 12px;
  `)}
`;

const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const Background = styled.img`
  max-width: 100%;
  height: 754px;
  object-fit: cover;

  ${mobile(css`
    height: 670px;
  `)}
`;

const shake = keyframes`
  0% {
        transform: rotate(0deg)
    }
    25% {
        transform: rotate(-8deg);
    }
    50% {
        transform: rotate(8deg);
    }
    75% {
        transform: rotate(-8deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const MainBanner = styled.div`
  position: absolute;
  top: 180px;

  display: flex;
  gap: 80px;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  ${mobile(css`
    top: 112px;
    gap: 64px;
  `)}

  .labels {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title {
    margin-bottom: 32px;
    font-size: 60px;
    font-weight: 800;

    ${mobile(css`
      margin-top: 40px;
      margin-bottom: 18px;
      font-size: 35px;
    `)}
  }

  .detail {
    font-size: 30px;

    ${mobile(css`
      font-size: 20px;
    `)}
  }

  .eng {
    font-size: 19px;

    ${mobile(css`
      font-size: 14px;
    `)}
  }

  .buttons {
    display: flex;
    gap: 16px;
    align-items: center;

    ${mobile(css`
      gap: 8px;
    `)}
  }

  button {
    width: 187px;
    height: 52px;
    padding: 16px;
    border-radius: 12px;
    font-size: 20px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    ${mobile(css`
      width: 156px;
      height: 52px;
      font-size: 16px;
    `)}

    &:hover {
      transition: transform 0.5s ease;
      animation: ${shake} 0.7s;
    }
  }

  .community {
    background: ${({ theme }) => theme.colors.mainBlue};
    color: ${({ theme }) => theme.colors.white};
  }

  .asso {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
