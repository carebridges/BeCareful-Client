import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as SymbolIcon } from '@/assets/icons/landing/Symbol.svg';
import { useIsMobile } from '@/hooks/useIsMobile';

import { mobile } from '@/utils/mobileStyle';

const CommunityGuideSection = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <CommunityGuideWrapper>
      <label className="title">커뮤니티 안내</label>
      <CommunityGuide>
        <label className="community">
          센터장님을 위한
          <br />
          <span>전용 커뮤니티</span>가<br />
          운영 중입니다.
        </label>
        <label className="for">
          전북 내 장기요양기관 센터장 누구나 참여 가능하며,
          <br />
          다양한 교육과 교류가 이루어집니다.
        </label>
        <button>커뮤니티 참여하기</button>
        <SymbolIcon />
      </CommunityGuide>
    </CommunityGuideWrapper>
  ) : (
    <CommunityGuideWrapper>
      <CommunityGuide>
        <label className="title">커뮤니티 안내</label>
        <label className="community">
          센터장님을 위한
          <br />
          <span>전용 커뮤니티</span>가 운영 중입니다.
        </label>
        <label className="for">
          전북 내 장기요양기관 센터장 누구나 참여 가능하며,
          <br />
          다양한 교육과 교류가 이루어집니다.
        </label>
        <button>커뮤니티 참여하기</button>
      </CommunityGuide>
      <SymbolIcon />
    </CommunityGuideWrapper>
  );
};

export default CommunityGuideSection;

const CommunityGuideWrapper = styled.div`
  padding: 100px 30px 160px 0;
  display: flex;
  gap: 200px;
  justify-content: center;
  align-items: center;

  ${mobile(css`
    padding: 60px 20px;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
  `)}

  .title {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: 40px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    ${mobile(css`
      font-size: ${({ theme }) => theme.typography.fontSize.title3};
    `)}
  }
`;

const shake = keyframes`
  0% {
        transform: rotate(0deg)
    }
    25% {
        transform: rotate(-4deg);
    }
    50% {
        transform: rotate(4deg);
    }
    75% {
        transform: rotate(-4deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const CommunityGuide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;

  ${mobile(css`
    gap: 30px;
    align-items: center;
    text-align: center;
  `)}

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .community {
    font-size: 50px;

    ${mobile(css`
      font-size: 30px;
    `)}
  }

  span {
    font-weight: 800;
  }

  .for {
    font-size: 30px;

    ${mobile(css`
      font-size: 15px;
    `)}
  }

  button {
    width: 279px;
    padding: 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.mainBlue};
    color: ${({ theme }) => theme.colors.white};
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    ${mobile(css`
      width: 156px;
      font-size: ${({ theme }) => theme.typography.fontSize.body1};
    `)}

    &:hover {
      transition: transform 0.5s ease;
      animation: ${shake} 0.7s;
    }
  }
`;
