import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import CaregiverWorkCard from '@/components/Caregiver/CaregiverWorkCard';
import {
  APPLY_TABS,
  MATCHING_STATUS,
} from '@/constants/caregiver/matchingStatus';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useApplicationListQuery } from '@/api/caregiver';

const CaregiverApplyPage = () => {
  const { handleNavigate } = useHandleNavigate();

  const [activeTab, setActiveTab] = useState('검토중');
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0);
  };

  const { data, error } = useApplicationListQuery(activeTab);
  if (error) {
    console.log('getApplicationList 에러: ', error);
  }

  return (
    <Container>
      <NavBar
        left={<NavLeft>지원현황</NavLeft>}
        right={
          <NavRight onClick={() => handleNavigate('/caregiver/chat')}>
            {data?.hasNewChat ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color=""
      />

      <TabWrapper>
        <Tabs>
          {APPLY_TABS.map((tab) => (
            <Tab
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => handleTabChange(tab)}
            >
              <TabText className={activeTab === tab ? 'active' : ''}>
                {tab}
              </TabText>
            </Tab>
          ))}
        </Tabs>
      </TabWrapper>

      <ApplicationsWrapper>
        <div className="count">총 {data?.recruitments.length}건</div>
        {data?.recruitments.length === 0 && (
          <div className="noapply">
            최근 {activeTab === '검토중' ? '검토 중인' : activeTab} 내역이
            없습니다.
          </div>
        )}
        {data?.recruitments?.map((application) => {
          const status = MATCHING_STATUS[activeTab];

          return (
            <CaregiverWorkCard
              key={application.recruitmentInfo.recruitmentId}
              recruitment={application}
              stateColor={status.stateColor}
              bgColor={status.bgColor}
              stateLabel={status.stateLabel}
              navigatePath="apply"
            />
          );
        })}
      </ApplicationsWrapper>
    </Container>
  );
};

export default CaregiverApplyPage;

const Container = styled.div`
  margin: auto 20px;
  padding-bottom: 72px;
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
`;

const TabWrapper = styled.div`
  display: flex;
  padding: 6px;
  box-sizing: border-box;

  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;

  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  gap: 4px;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100%;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 6px;

  &.active {
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  }
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
`;

const TabText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &.active {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  &:not(.active) {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ApplicationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .count {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .noapply {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-align: center;
  }
`;
