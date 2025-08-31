import styled, { css } from 'styled-components';
import { ReactComponent as AssociationLogo } from '@/assets/icons/landing/AssociationLogo.svg';
import { ReactComponent as AssociationLogoS } from '@/assets/icons/landing/AssociationLogoS.svg';
import { ReactComponent as Logo } from '@/assets/icons/landing/LogoBlack.svg';
import { ReactComponent as LogoS } from '@/assets/icons/landing/LogoS.svg';
import { useIsMobile } from '@/hooks/useIsMobile';
import { mobile } from '@/utils/mobileStyle';

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Container>
        <div className="labels">
          <label>개인정보처리방침</label>
          <label>|</label>
          <label>이용약관</label>
        </div>

        {isMobile ? (
          <MiddleMobile>
            <AssociationLogoS />
            <div className="manager">
              <label>담당자 : 이승현</label>
              <label>연락처 : 010 - 0000 - 0000</label>
            </div>
            <div className="dolbom">
              <div className="labels">
                <label>운영지원</label>
                <LogoS />
              </div>
              <label>연락처 : 010 - 0000 - 0000</label>
            </div>
          </MiddleMobile>
        ) : (
          <Middle>
            <AssociationLogo />
            <div className="right">
              <div className="labels">
                <label>전주완주장기요양기관협회</label>
                <label>|</label>
                <label>담당자 : 이승현</label>
                <label>|</label>
                <label>연락처 : 010 - 0000 - 0000</label>
              </div>
              <div className="labels">
                <div className="labels">
                  <label>운영지원</label>
                  <Logo />
                </div>
                <label>|</label>
                <label>연락처 : 010 - 0000 - 0000</label>
              </div>
            </div>
          </Middle>
        )}

        <label className="gray200">
          © 전주완주장기요양기관협회. 돌봄다리. ALL RIGHTS RESERVED
        </label>
      </Container>
    </>
  );
};

export default Footer;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 50px 20px 160px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.colors.subBlue};

  ${mobile(css`
    padding: 25px 20px 100px 20px;
    gap: 15px;
  `)}

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.body4};
    `)}
  }

  .labels {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .gray200 {
    color: ${({ theme }) => theme.colors.gray200};
  }
`;

const Middle = styled.div`
  display: flex;
  gap: 50px;

  .right {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const MiddleMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .manager {
    margin-top: -5px;
    display: flex;
    flex-direction: column;
  }

  .dolbom {
    display: flex;
    flex-direction: column;
  }
`;
