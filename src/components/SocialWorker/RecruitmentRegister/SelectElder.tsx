import { useWaitingElderly } from '@/api/elderly';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { NewElderRegistrationCard } from '@/components/SocialWorker/common/NewElderRegistrationCard';
import { useState } from 'react';
import { styled } from 'styled-components';

export const SelectElder = ({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (elderId: number) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError } = useWaitingElderly(
    currentPage,
    10,
    'page',
    searchTerm,
  );

  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;
  const list = data?.content ?? [];
  return (
    <>
      <TitleSection>
        어르신 선택
        <div className="subtitle">
          매칭 진행을 위해 공고를 등록할 어르신을 선택해 주세요.
        </div>
      </TitleSection>
      <ElderSection>
        <MatchingSearchBox
          placeholder="어르신 검색"
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

          {!isLoading && !isError && list.length === 0 && (
            <EmptyStateIndicator message="데이터가 없습니다" />
          )}
          {!isLoading &&
            !isError &&
            list.map((e) => (
              <ElderCard
                key={e.elderlyId}
                elderlyId={e.elderlyId}
                name={e.elderlyName}
                age={e.elderlyAge}
                gender={e.elderlyGender}
                careLevel={e.elderlyCareLevel}
                imageUrl={e.elderlyProfileImageUrl}
                selected={value === e.elderlyId}
                onClick={() => onChange(e.elderlyId)}
              />
            ))}
        </CardContainer>
        <NewElderRegistrContainer>
          <NewElderRegistrationCard />
        </NewElderRegistrContainer>

        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </PaginationContainer>
      </ElderSection>
    </>
  );
};

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px 0 20px;
  align-items: flex-start;
  gap: 8px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  .subtitle {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const ElderSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  padding-top: 20px;
  width: 100%;
  box-sizing: border-box;
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
