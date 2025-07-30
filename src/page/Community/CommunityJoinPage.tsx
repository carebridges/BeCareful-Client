import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { CommunityJoinSearchInput } from '@/components/Community/JoinCommunity/CommunityJoinSearchInput';
import { useState } from 'react';
import { CommunitySearchList } from '@/components/Community/JoinCommunity/CommunitySearchList';

export const CommunityJoinPage = () => {
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState('');

  return (
    <>
      <Header>
        <NavbarWrapper>
          <BackButtonWrapper onClick={() => navigate('/community')}>
            <ArrowLeft />
          </BackButtonWrapper>
          <NavTitle>커뮤니티</NavTitle>
        </NavbarWrapper>
        <CommunityJoinSearchInput onCommunitySelect={setCommunityName} />
      </Header>

      <ContentWrapper>
        <CommunitySearchList keyword={communityName} />
      </ContentWrapper>
    </>
  );
};

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background: ${({ theme }) => theme.colors.white};
  z-index: 10;

  padding: 0 20px 8px;
  display: flex;
  flex-direction: column;
`;

const NavbarWrapper = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavTitle = styled.div`
  position: absolute;
  pointer-events: none;
  left: 0;
  right: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ContentWrapper = styled.div`
  margin-top: 116px;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  height: 56px;
  width: 100%;
`;
