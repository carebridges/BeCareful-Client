import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { ElderCard } from '@/components/Matching/ElderCard';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { Tab } from '@/components/common/Tab/Tab';
import { useRecruitment, useWaitingElderly } from '@/api/elderly';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NewElderRegistrationCard } from '@/components/SocialWorker/common/NewElderRegistrationCard';
import { FloatingPostButton } from '@/components/SocialWorker/common/FloatingPostButton';
import { ElderMatchingCard } from '@/components/SocialWorker/MatchingStatus/ElderMatchingCard';
import { RegisterElderModal } from '@/components/SocialWorker/RegisterMatchingElder/RegisterElderModal';

const TAB_LABELS = ['매칭 대기', '매칭 중', '매칭 완료'] as const;

export const SocialWorkerMatchingListPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<0 | 1 | 2>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedElderId, setSelectedElderId] = useState<number | null>(null);

  const status = useMemo(
    () =>
      selectedTab === 1 ? '매칭중' : selectedTab === 2 ? '매칭완료' : null,
    [selectedTab],
  );

  const {
    data: waitData,
    isLoading: waitLoading,
    isError: waitError,
  } = useWaitingElderly(currentPage, 10, 'page', searchTerm);

  const {
    data: matchData,
    isLoading: matchLoading,
    isError: matchError,
  } = useRecruitment(status, currentPage, 10, searchTerm);

  const isLoading = selectedTab === 0 ? waitLoading : matchLoading;
  const isError = selectedTab === 0 ? waitError : matchError;

  const totalPages =
    selectedTab === 0
      ? (waitData?.totalPages ?? 0)
      : (matchData?.totalPages ?? 0);
  const totalElements =
    selectedTab === 0
      ? (waitData?.totalElements ?? 0)
      : (matchData?.totalElements ?? 0);

  const cards =
    selectedTab === 0
      ? (waitData?.content ?? []).map((e) => (
          <ElderCard
            key={e.elderlyId}
            elderlyId={e.elderlyId}
            name={e.elderlyName}
            age={e.elderlyAge}
            gender={e.elderlyGender}
            careLevel={e.elderlyCareLevel}
            imageUrl={e.elderlyProfileImageUrl}
            onClick={() => {
              setSelectedElderId(e.elderlyId);
              setIsRegisterModalOpen(true);
            }}
          />
        ))
      : (matchData?.content ?? []).map((it) => (
          <ElderMatchingCard
            key={it.recruitmentInfo.recruitmentId}
            data={it}
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(
                `/socialworker/recruitment/${it.recruitmentInfo.recruitmentId}`,
              );
            }}
          />
        ));

  return (
    <>
      <Container>
        <NavBar
          left={
            <NavLeft onClick={() => navigate(-1)}>
              <ArrowLeft />
            </NavLeft>
          }
          center={<NavCenter>매칭</NavCenter>}
          color="white"
        />

        <TabContainer>
          <Tab
            tabs={TAB_LABELS.map((label) => ({ name: label, content: null }))}
            currentTab={selectedTab}
            onTabChange={(i) => {
              setSelectedTab(i as 0 | 1 | 2);
              setCurrentPage(1);
            }}
          />
        </TabContainer>

        <MatchingSearchBox
          placeholder={
            selectedTab === 0
              ? '아직 공고를 등록하지 않은 어르신 검색'
              : '공고/어르신 검색'
          }
          value={searchTerm}
          onChange={(v) => {
            setSearchTerm(v);
            setCurrentPage(1);
          }}
        />

        <CountText>총 {totalElements}명</CountText>

        <CardContainer>
          {isError && <ErrorIndicator />}
          {isLoading && <LoadingIndicator />}

          {!isLoading && !isError && cards.length === 0 && (
            <EmptyStateIndicator message="데이터가 없습니다" />
          )}

          {!isLoading && !isError && cards}
        </CardContainer>

        {selectedTab === 0 && (
          <NewElderRegistrContainer>
            <NewElderRegistrationCard />
          </NewElderRegistrContainer>
        )}

        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </PaginationContainer>

        <FloatingPostButton />
      </Container>
      {isRegisterModalOpen && selectedElderId !== null && (
        <RegisterElderModal
          width="320px"
          onClose={() => setIsRegisterModalOpen(false)}
          onCancel={() => {
            setIsRegisterModalOpen(false);
            navigate('/socialworker/recruitment/new', {
              state: { elderlyId: selectedElderId },
            });
          }}
        />
      )}
      <SocialWorkerTabBar />
    </>
  );
};

export default SocialWorkerMatchingListPage;

const Container = styled.div`
  padding-bottom: 120px;
  margin: auto 20px;
`;

const NavLeft = styled.div`
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  padding-bottom: 8px;
  height: 52px;
`;

const CountText = styled.div`
  display: flex;
  padding-top: 16px;
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  color: ${({ theme }) => theme.colors.gray600};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  padding-top: 16px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const NewElderRegistrContainer = styled.div`
  display: flex;
  padding-top: 16px;
`;
