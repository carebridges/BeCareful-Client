import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as Work } from '@/assets/icons/tabbar/Work.svg';
import { ReactComponent as Apply } from '@/assets/icons/tabbar/Apply.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';
import { NavLink } from 'react-router-dom';

const CaregiverTabBar = () => {
  return (
    <TabBarWrapper>
      <TabItem to="/caregiver" end className="cg-home">
        <Home />
        <span>홈</span>
      </TabItem>
      <TabItem to="/caregiver/work" className="cg-work">
        <Work />
        <span>일자리</span>
      </TabItem>
      <TabItem to="/caregiver/apply" className="cg-apply">
        <Apply />
        <span>지원현황</span>
      </TabItem>
      <TabItem to="/caregiver/my" className="cg-profile">
        <Mypage />
        <span>마이페이지</span>
      </TabItem>
    </TabBarWrapper>
  );
};

export default CaregiverTabBar;

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

const TabItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  gap: 2px;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray200};

  span {
    font-size: 11px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  &.active {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
