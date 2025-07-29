import { NavBar } from '@/components/common/NavBar/NavBar';
import { ElderlyCard } from '@/components/Elderly/ElderlyCard';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { useElderlyList } from '@/api/elderly';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { useState } from 'react';

const ElderlyPage = () => {
  const navigate = useNavigate();
  const { data: elderlyList = [], isLoading, error } = useElderlyList();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredList = elderlyList.filter((elder) =>
    elder.name.includes(searchTerm),
  );

  return (
    <Container>
      <NavBar
        left={
          <NavLeft onClick={() => navigate(-1)}>
            <ArrowLeft />
          </NavLeft>
        }
        center={
          <NavCenter onClick={() => navigate('/elderly')}>
            어르신 목록
          </NavCenter>
        }
        right={
          <NavRight onClick={() => navigate('/elderly/new')}>등록하기</NavRight>
        }
        color=""
      />
      <SearchContainer>
        <MatchingSearchBox
          placeholder="검색할 이름을 입력해주세요."
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
        />
      </SearchContainer>

      <MainContent>
        <Counting>총 {filteredList.length}명</Counting>
        {isLoading && <LoadingIndicator />}
        {error && <ErrorIndicator />}
        {!isLoading && !error && elderlyList.length === 0 && (
          <EmptyStateIndicator message="어르신 정보가 없습니다" />
        )}

        {filteredList.map((elder) => (
          <ElderlyCard
            key={elder.elderlyId}
            elderlyId={elder.elderlyId}
            isMatching={elder.isMatching}
            name={elder.name}
            age={elder.age}
            gender={elder.gender}
            careLevel={elder.careLevel}
            caregiverNum={elder.caregiverNum}
            imageUrl={elder.imageUrl}
          />
        ))}
      </MainContent>

      <SocialWorkerTabBar />
    </Container>
  );
};

export default ElderlyPage;

const Container = styled.div`
  margin-bottom: 107px;
`;

const NavLeft = styled.div`
  cursor: pointer;
  margin-left: 20px;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const NavRight = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-right: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto 20px;
  margin-top: 16px;
`;

const Counting = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SearchContainer = styled.div`
  display: flex;
  margin: 12px 20px 0px 20px;
`;
