import { useMemo, useState } from 'react';
import { useRecruitmentListQuery } from '@/api/caregiver';

export const useMatchingList = () => {
  // 매칭 공고 리스트 조회
  const { data: matchingListData, error: matchingListError } =
    useRecruitmentListQuery();
  if (matchingListError) {
    console.log('getMatchingList 에러: ', matchingListError);
  }

  const [activeTab, setActiveTab] = useState('전체');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const filteredMatchingList = useMemo(() => {
    if (!matchingListData) {
      return [];
    }

    switch (activeTab) {
      case '전체':
        return matchingListData;
      case '시급 TOP':
        return matchingListData.filter((item) => item.isHourlySalaryTop);
      case '인기공고':
        return matchingListData.filter((item) => item.isHotRecruitment);
      case '조건일치':
        return matchingListData.filter((item) =>
          ['높음', '보통'].includes(item.matchingResultStatus),
        );
      default:
        return matchingListData;
    }
  }, [matchingListData, activeTab]);

  return { activeTab, handleTabChange, filteredMatchingList };
};
