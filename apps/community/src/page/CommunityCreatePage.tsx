'use client';

import Logo from '@repo/ui/src/assets/icons/Logo.svg';
import Chat from '@repo/ui/src/assets/icons/Chat.svg';

import styled from 'styled-components';

import { HomeMainContent } from '@/components/Home/HomeMainContent';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { currentUserInfo, getTodayDate, useLoadUserInfo } from '@repo/common';
import { NavBar } from '@repo/ui';

export const CommunityCreatePage = () => {
  const router = useRouter();
  useLoadUserInfo();
  const userInfo = useRecoilValue(currentUserInfo);

  const handleLogoClick = () => {
    router.push('/socialworker'); //TODO
  };

  const handleChatClick = () => {
    router.push('/socialworker/chat'); //TODO
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft onClick={handleLogoClick}>
            <Logo />
          </NavLeft>
        }
        right={
          <NavRight onClick={handleChatClick}>
            <Chat />
          </NavRight>
        }
        color="blue"
      />

      <MainWrapper>
        <LabelWrapper>
          <Name>
            {userInfo.nickName}님
            <br />
            협회 커뮤니티를 둘러보세요.
          </Name>
          <DateLabel>{getTodayDate()}</DateLabel>
        </LabelWrapper>
      </MainWrapper>

      <HomeMainContent />
      {/* <SocialWorkerTabBar /> */}
    </Container>
  );
};

const Container = styled.div`
  background: #f2f3f7;
  height: 100vh;
  margin-bottom: 57px;
`;

const NavLeft = styled.div`
  width: 84px;
  height: 32px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  padding-right: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
`;

const MainWrapper = styled.div`
  background: ${({ theme }) => theme.colors.mainBlue};
  height: 188px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const DateLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
