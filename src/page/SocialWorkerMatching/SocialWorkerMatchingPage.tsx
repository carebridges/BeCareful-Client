import { useState } from 'react';
import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { MatchingApplyModal } from '@/components/Matching/Modal/MatchingApplyModal';
import { ElderData } from '@/types/Matching';
import { styled } from 'styled-components';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { useElderlyList } from '@/api/elderly';
import { EmptyStateIndicator } from '@/components/common/EmptyStateIndicator/EmptyStateIndicator';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ComingSoonModal } from '@/components/SocialWorker/common/ComingSoonModal';

export const SocialWorkerMatchingPage = ({
  previewMode = false,
}: {
  previewMode?: boolean;
}) => {
  const { data: elderList = [], isError, isLoading } = useElderlyList();
  const [modalData, setModalData] = useState<ElderData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (elder: ElderData) => setModalData(elder);
  const closeModal = () => setModalData(null);

  const filteredList = elderList.filter((elder) =>
    elder.name.includes(searchTerm),
  );

  return (
    <>
      <Container>
        <TopContainer>매칭 등록하기</TopContainer>

        <SearchContainer>
          <MatchingSearchBox
            placeholder="검색할 이름을 입력해주세요."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </SearchContainer>

        <CardContainer>
          {isError && <ErrorIndicator />}
          {isLoading && <LoadingIndicator />}
          {!isLoading && !isError && elderList.length === 0 && (
            <EmptyStateIndicator message="어르신 정보가 없습니다" />
          )}

          {filteredList.map((elder) => (
            <ElderCard
              key={elder.elderlyId}
              {...elder}
              onClick={() => openModal(elder)}
            />
          ))}
        </CardContainer>

        {modalData && (
          <MatchingApplyModal
            width="312px"
            onClose={closeModal}
            data={modalData}
          />
        )}
      </Container>

      {previewMode && <ComingSoonModal width="312px" />}

      <SocialWorkerTabBar />
    </>
  );
};

const Container = styled.div`
  padding-bottom: 77px;
  margin: auto 20px;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;

  justify-content: space-between;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px 0px 0px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 8px;
  padding: 16px 20px 0px 0px;
`;
