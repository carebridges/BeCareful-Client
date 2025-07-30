import { NavBar } from '@/components/common/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { useElderMatchingList } from '@/api/matching.socialWorker';
import { ElderMatchingCard } from '@/components/SocialWorker/MatchingStatus/ElderMatchingCard';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { useState } from 'react';
import { Tab } from '@/components/common/Tab/Tab';

const STATUS_LABELS = ['진행중', '완료', '전체'];

const MatchingStatusPage = () => {
  const navigate = useNavigate();
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0);
  const selectedStatusParam = STATUS_LABELS[selectedStatusIndex];

  const {
    data = [],
    isLoading,
    isError,
  } = useElderMatchingList(selectedStatusParam);

  const tabItems = STATUS_LABELS.map((name) => ({
    name,
    content: (
      <CardListWrapper>
        {isLoading && <LoadingIndicator />}
        {isError && <ErrorIndicator />}
        {!isLoading && !isError && data.length === 0 && (
          <EmptyStateIndicator message="매칭된 어르신이 없습니다." />
        )}
        {!isLoading &&
          !isError &&
          data.map((item) => (
            <ElderMatchingCard
              key={item.recruitmentId}
              recruitmentId={item.recruitmentId}
              name={item.elderlyInfo.elderlyName}
              age={item.elderlyInfo.elderlyAge}
              gender={item.elderlyInfo.elderlyGender === 'MALE' ? '남' : '여'}
              matchingCount={item.matchingCount}
              applicantCount={item.applyCount}
            />
          ))}
      </CardListWrapper>
    ),
  }));

  return (
    <>
      <Container>
        <NavBar
          left={
            <NavLeft onClick={() => navigate(-1)}>
              <ArrowLeft />
            </NavLeft>
          }
          center={<NavCenter>매칭 현황</NavCenter>}
          color="white"
        />
        <CardWrapper>
          <Tab
            tabs={tabItems}
            currentTab={selectedStatusIndex}
            onTabChange={setSelectedStatusIndex}
          />
        </CardWrapper>
      </Container>
      <SocialWorkerTabBar />
    </>
  );
};

export default MatchingStatusPage;

const Container = styled.div`
  padding-bottom: 133px;
  margin: auto 20px;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
