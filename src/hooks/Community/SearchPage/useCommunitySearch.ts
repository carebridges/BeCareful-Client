import { useCallback, useMemo, useState } from 'react';
import { BOARD_KR_TO_EN } from '@/constants/community/communityBoard';
import { useRecentSearches } from '@/hooks/Community/SearchPage/useRecentSearches';
import { useBoardPostings } from '@/hooks/Community/api/useBoardPostings';
import { useBoardPostList } from '@/hooks/Community/api/useBoardPostList';
import { searchPost } from '@/utils/searchPosts';
import { PageableRequest } from '@/types/Community/common';

export const useCommunitySearch = () => {
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
    BOARD_KR_TO_EN[selectedBoard],
    pageable,
  );

  // 실제 검색할 데이터(모든 쿼리 데이터 합치기)
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

  return {
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
  };
};
