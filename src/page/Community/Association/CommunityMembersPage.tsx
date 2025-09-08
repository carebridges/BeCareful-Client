import styled from 'styled-components';
import { useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { currentUserInfo } from '@/recoil/currentUserInfo';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import MemberListCard from '@/components/Community/association/MemberListCard';
import MemberRequestCard from '@/components/Community/association/MemberRequestCard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import {
  useJoinRequest,
  useMembers,
  useMembersOverview,
} from '@/api/communityAssociation';
import { useGetSocialWorkerMy } from '@/api/socialworker';

const CommunityMembersPage = () => {
  const { handleGoBack } = useHandleNavigate();

  // const userInfo = useRecoilValue(currentUserInfo);
  // const isChairman = userInfo.associationRank === 'CHAIRMAN';

  const [activeTab, setActiveTab] = useState('회원');
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0);
  };

  const { data: tabData } = useMembersOverview();
  const { data: members } = useMembers();
  const { data: requests } = useJoinRequest();

  const { data } = useGetSocialWorkerMy();
  const isChairman = data?.socialWorkerInfo.associationRank === 'CHAIRMAN';

  const tabs = isChairman
    ? [
        { name: '회원', count: tabData?.memberCount },
        { name: '가입 신청', count: tabData?.pendingApplicationCount },
      ]
    : [{ name: '회원', count: tabData?.memberCount }];

  const tabCount = activeTab === '회원' ? members?.count : requests?.count;

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회원 목록</NavCenter>}
        color="white"
      />
      <Tabs>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            active={activeTab === tab.name}
            onClick={() => handleTabChange(tab.name)}
          >
            {tab.name} {tab.count}
          </Tab>
        ))}
      </Tabs>

      <TabContent>
        <label className="count">총 {tabCount}명</label>
        {activeTab === '회원'
          ? members?.members.map((member) => (
              <MemberListCard key={member.memberId} member={member} />
            ))
          : requests?.applications.map((request) => (
              <MemberRequestCard
                key={request.joinApplicationId}
                request={request}
              />
            ))}
      </TabContent>
    </Container>
  );
};

export default CommunityMembersPage;

const Container = styled.div`
  margin: 0 20px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Tabs = styled.div`
  margin: 0 -20px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tab = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.gray50};
  border-bottom: ${({ active }) => (active ? '2px solid #0370ff' : '')};
  cursor: pointer;
`;

const TabContent = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .count {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
