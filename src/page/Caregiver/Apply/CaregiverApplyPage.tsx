import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Chat } from '@/assets/icons/ChatNewBlack.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import CaregiverWorkCard from '@/components/Caregiver/CaregiverWorkCard';
import { useApplicationListQuery } from '@/hooks/Caregiver/caregiverQuery';

const CaregiverApplyPage = () => {
  const navigate = useNavigate();

  const chatNew = false;

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
          <NavRight
            onClick={() => {
              navigate('/caregiver/chatlist');
              window.scrollTo(0, 0);
            }}
          >
            {chatNew ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color=""
      />

      <TabWrapper>
        <Tabs>
          {['검토중', '합격', '거절'].map((tab) => (
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
        {data?.map((application) => (
          <CaregiverWorkCard
            key={application.recruitmentInfo.recruitmentInfo.recruitmentId}
            recruitment={application.recruitmentInfo}
            stateColor={
              application.matchingApplicationStatus === '검토중'
                ? 'mainBlue'
                : application.matchingApplicationStatus === '합격'
                  ? 'mainGreen'
                  : 'gray500'
            }
            bgColor={
              application.matchingApplicationStatus === '검토중'
                ? 'subBlue'
                : application.matchingApplicationStatus === '합격'
                  ? 'subGreen'
                  : 'gray50'
            }
            stateLabel={application.matchingApplicationStatus}
            navigatePath="apply"
          />
        ))}
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
`;
