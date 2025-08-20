import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as NoRecentSearch } from '@/assets/icons/community/Search.svg';
import { ReactComponent as SearchIcon } from '@/assets/icons/Search.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/community/CloseCircle.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import PostOverview from '@/components/Community/common/PostOverview';
import {
  Board_Type_Mapping,
  COMMUNITY_BOARDS,
} from '@/constants/communityBoard';
import { searchPost } from '@/utils/searchPosts';
import { useRecentSearches } from '@/hooks/Community/SearchPage/useRecentSearches';
import { PageableRequest } from '@/types/Community/common';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useBoardPostings } from '@/hooks/Community/api/useBoardPostings';
import { useBoardPostList } from '@/hooks/Community/api/useBoardPostList';

const CommunitySearchPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(true);

  const {
    recentSearches,
    updateRecentSearch,
    handleRemoveRecentSearch,
    handleRemoveAllRecentSearch,
  } = useRecentSearches();

  // 게시판 선택
  const [selectedBoard, setSelectedBoard] = useState('전체');
  const handleBoardFilterChange = (board: string) => {
    setSelectedBoard(board);
    setShowRecentSearches(false);
  };

  // 게시판 데이터
  const pageable: PageableRequest = { page: 0, size: 50, sort: [] };
  const allBoardData = useBoardPostings(pageable);
  const { data: boardData } = useBoardPostList(
    Board_Type_Mapping[selectedBoard],
    pageable,
  );

  // 실제 검색할 데이터
  const selectedBoardData = useMemo(() => {
    if (selectedBoard === '전체') {
      // 모든 쿼리의 content를 합쳐서 BoardPostListResponse 형태로 반환
      const content = allBoardData.every((query) => query.isSuccess)
        ? allBoardData.flatMap((query) => query.data || [])
        : [];
      return content;
    } else {
      // 단일 쿼리의 content를 BoardPostListResponse 형태로 반환
      return boardData || [];
    }
  }, [selectedBoard, allBoardData, boardData]);

  // 검색 실행
  const handleSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        return;
      }

      updateRecentSearch(trimmedQuery);
      setSearchTerm(trimmedQuery); // 검색어 입력 필드 업데이트
      setShowRecentSearches(false); // 검색 후 최근 검색어 목록 숨기기
    },
    [updateRecentSearch],
  );

  // 검색 결과
  const searchResults = useMemo(() => {
    const trimmedSearchTerm = searchTerm.trim();
    return searchPost(trimmedSearchTerm, selectedBoardData);
  }, [searchTerm, selectedBoardData]);

  // 검색어 입력
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setShowRecentSearches(true);
    },
    [],
  );

  // 최근 검색어 클릭
  const handleRecentSearchClick = useCallback(
    (query: string) => {
      setSearchTerm(query);
      handleSearch(query);
    },
    [handleSearch],
  );

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>검색</NavCenter>}
        color=""
      />

      <SearchBarWrapper>
        <SearchBar
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowRecentSearches(true)}
          onBlur={() => setTimeout(() => setShowRecentSearches(false), 100)}
        />
        <IconWrapper>
          {searchTerm && (
            <Close
              onClick={() => {
                setSearchTerm('');
                setShowRecentSearches(true);
              }}
            />
          )}
          <Search onClick={() => handleSearch(searchTerm)} />
        </IconWrapper>
      </SearchBarWrapper>

      <SearchResultWrapper>
        {showRecentSearches ? (
          recentSearches.length > 0 ? (
            <>
              <div className="labels">
                <label>최근 검색어</label>
                <label className="delete" onClick={handleRemoveAllRecentSearch}>
                  전체 삭제
                </label>
              </div>
              <RecentSearchWrapper>
                {recentSearches.map((recentSearch, index) => (
                  <div
                    className="search"
                    key={index}
                    onClick={() => handleRecentSearchClick(recentSearch)}
                  >
                    {recentSearch}
                    <Close
                      onClick={(e) => handleRemoveRecentSearch(recentSearch, e)}
                    />
                  </div>
                ))}
              </RecentSearchWrapper>
            </>
          ) : (
            <>
              <label>최근 검색어</label>
              <NoRecentSearchWrapper>
                <NoRecentSearch />
                <label className="no">최근 검색어가 없습니다</label>
              </NoRecentSearchWrapper>
            </>
          )
        ) : (
          <>
            <BoardFilterWrapper>
              {COMMUNITY_BOARDS.map((board) => (
                <Board
                  key={board}
                  active={selectedBoard === board}
                  onClick={() => handleBoardFilterChange(board)}
                >
                  {board}
                </Board>
              ))}
            </BoardFilterWrapper>
            <label>{searchResults.length}건</label>
            <PostWrapper>
              {searchResults.map((post) => (
                <>
                  <PostOverview
                    key={post.postId}
                    post={post}
                    // boardType={
                    //   selectedBoard === '전체'
                    //     ? post.boardType
                    //     : Board_Type_Mapping[selectedBoard]
                    // }
                  />
                  <Border />
                </>
              ))}
            </PostWrapper>
          </>
        )}
      </SearchResultWrapper>
    </Container>
  );
};

export default CommunitySearchPage;

const Container = styled.div`
  margin: 0px 20px;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const SearchBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 6px;

  position: absolute;
  top: 15px;
  right: 16px;
`;

const Search = styled(SearchIcon)`
  circle,
  path {
    stroke: ${({ theme }) => theme.colors.gray700};
  }

  cursor: pointer;
`;

const Close = styled(CloseIcon)`
  cursor: pointer;
`;

const SearchResultWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .delete {
    color: ${({ theme }) => theme.colors.gray300};
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

const BoardFilterWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 10px;
`;

const Board = styled.div<{ active: boolean }>`
  padding: 4px 8px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: 4px;
  background: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.subBlue};
`;

const PostWrapper = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const Border = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  height: 1px;
`;

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .search {
    padding-top: 16px;
    display: flex;
    justify-content: space-between;

    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }
`;

const NoRecentSearchWrapper = styled.div`
  margin-top: 145px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  .no {
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;
