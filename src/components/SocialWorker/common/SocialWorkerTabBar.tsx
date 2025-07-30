import { styled } from 'styled-components';
import { SOCIAL_WORKER_TAB } from '@/constants/tabItems.socialWorker';
import { Link, useLocation } from 'react-router-dom';

export const SocialWorkerTabBar = () => {
  const location = useLocation();

  return (
    <TabBarWrapper>
      {SOCIAL_WORKER_TAB.map(({ key, path, label, Icon }) => {
        const isActive =
          (key === 'home' &&
            (location.pathname === '/socialworker/matching/dashboard' ||
              location.pathname === '/socialworker/elderly')) ||
          location.pathname === path;

        return (
          <TabBarContentWrapper as={Link} to={path} key={key}>
            <TabBarIcon $isActive={isActive}>
              <Icon />
            </TabBarIcon>
            <TabBarLabel $isActive={isActive}>{label}</TabBarLabel>
          </TabBarContentWrapper>
        );
      })}
    </TabBarWrapper>
  );
};

const TabBarWrapper = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  position: fixed;
  bottom: 0;
  background: ${({ theme }) => theme.colors.white};
`;

const TabBarContentWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  gap: 2px;
  text-decoration: none;
  cursor: pointer;
`;

const TabBarIcon = styled.div<{ $isActive: boolean }>`
  width: 24px;
  height: 24px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.mainBlue : theme.colors.gray200};
`;

const TabBarLabel = styled.p<{ $isActive: boolean }>`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.mainBlue : theme.colors.gray200};
`;
