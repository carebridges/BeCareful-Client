import { useRecruitmentList } from '@/api/matching/caregiver';
import { useMemo, useState } from 'react';

export const useMatchingList = () => {
  // 매칭 공고 리스트 조회
  const { data: matchingListData, error: matchingListError } =
    useRecruitmentList();
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
      case '모집중':
        return matchingListData.filter(
          (item) => item.recruitmentInfo.isRecruiting,
        );
      case '시간일치':
        return matchingListData.filter((item) => item.isTimeMatched);
      default:
        return matchingListData;
    }
  }, [matchingListData, activeTab]);

  return { activeTab, handleTabChange, filteredMatchingList };
};
