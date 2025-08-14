import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';

import { NavBar } from '@/components/common/NavBar/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { getTodayDate } from '@/utils/getTodayDate';
import { HomeMainContent } from '@/components/Home/HomeMainContent';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo';

export const CommunityCreatePage = () => {
  const navigate = useNavigate();
  useLoadUserInfo();
  const userInfo = useRecoilValue(currentUserInfo);

  const handleLogoClick = () => {
    navigate('/home/caregiver'); //TODO
  };

  const handleChatClick = () => {
    navigate('/caregiver/chat'); //TODO
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
      <SocialWorkerTabBar />
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
