import { MAX_RECENT_SEARCHES } from '@/constants/community/communitySearch';
import { useCallback, useEffect, useState } from 'react';

/* CommunitySearchPage */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 최근 검색어 불러오기
  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error(
        '로컬 스토리지에서 최근 검색어를 불러오는 데 실패했습니다:',
        error,
      );
    }
  }, []);

  // 최근 검색어 저장
  useEffect(() => {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } catch (error) {
      console.error(
        '로컬 스토리지에 최근 검색어를 저장하는 데 실패했습니다:',
        error,
      );
    }
  }, [recentSearches]);

  // 최근 검색어 목록 업데이트
  const updateRecentSearch = useCallback((query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setRecentSearches((prevSearches) => {
      // 중복 제거: 기존에 같은 검색어가 있다면 제거
      const newSearches = prevSearches.filter((item) => item !== trimmedQuery);
      // 최신 검색어를 맨 앞에 추가
      const updatedSearches = [trimmedQuery, ...newSearches];

      return updatedSearches.slice(0, MAX_RECENT_SEARCHES); // 최대 개수 유지
    });
  }, []);

  // 최근 검색어 삭제(개별)
  const handleRemoveRecentSearch = useCallback(
    (queryToRemove: string, e: React.MouseEvent) => {
      e.stopPropagation(); // 부모 요소의 클릭 이벤트(최근 검색어 클릭) 방지
      setRecentSearches((prevSearches) =>
        prevSearches.filter((item) => item !== queryToRemove),
      );
    },
    [],
  );

  // 최근 검색어 전체 삭제
  const handleRemoveAllRecentSearch = useCallback(() => {
    setRecentSearches([]);
  }, []);

  return {
    recentSearches,
    updateRecentSearch,
    handleRemoveRecentSearch,
    handleRemoveAllRecentSearch,
  };
};
