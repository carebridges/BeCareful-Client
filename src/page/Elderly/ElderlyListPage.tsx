import { NavBar } from '@/components/common/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { useElderlyList } from '@/api/elderly';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { useState } from 'react';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { FloatingElderlyNewButton } from '@/components/SocialWorker/common/FloatingElderlyNewButton';

const ElderlyListPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError } = useElderlyList(
    currentPage,
    10,
    searchTerm.trim() || undefined,
  );

  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  const cards = (data?.content ?? []).map((e) => (
    <ElderCard
      key={e.elderlyId}
      elderlyId={e.elderlyId}
      name={e.elderlyName}
      age={e.elderlyAge}
      gender={e.elderlyGender}
      careLevel={e.elderlyCareLevel}
      imageUrl={e.elderlyProfileImageUrl}
      onClick={() => navigate(`/socialworker/elderly/${e.elderlyId}`)}
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
          center={<NavCenter>어르신 목록</NavCenter>}
          color="white"
        />

        <MatchingSearchBox
          placeholder="검색할 어르신을 입력해 주세요."
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
            <EmptyStateIndicator message="등록된 어르신이 없습니다" />
          )}

          {!isLoading && !isError && cards}
        </CardContainer>

        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </PaginationContainer>

        <FloatingElderlyNewButton />
      </Container>
    </>
  );
};

export default ElderlyListPage;

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
