import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as NoRecentSearch } from '@/assets/icons/community/Search.svg';
import { ReactComponent as SearchIcon } from '@/assets/icons/Search.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/community/CloseCircle.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import PostOverview from '@/components/Community/common/PostOverview';
import { COMMUNITY_BOARDS_TAB } from '@/constants/community/communityBoard';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useCommunitySearch } from '@/hooks/Community/SearchPage/useCommunitySearch';

const CommunitySearchPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const {
    searchTerm,
    setSearchTerm,
    showRecentSearches,
    setShowRecentSearches,
    selectedBoard,
    recentSearches,
    searchResults,
    handleSearch,
    handleSearchChange,
    handleBoardFilterChange,
    handleRecentSearchClick,
    handleRemoveAllRecentSearch,
    handleRemoveRecentSearch,
  } = useCommunitySearch();

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
              {COMMUNITY_BOARDS_TAB.map((board) => (
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
                  <PostOverview key={post.postId} post={post} />
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
