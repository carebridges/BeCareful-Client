import { Recruitment } from '@/types/Caregiver/common';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';

/* 요양보호사 지원 현황 화면 */
interface MatchingRecruitment {
  recruitmentInfo: Recruitment;
  // matchingStatus: '지원검토중' | '합격' | '지원거절';
  matchingStatus: string;
}

// 지원 현황 조회 응답
export type MatchingMyRecruitmentResponse = {
  recruitments: MatchingRecruitment[];
  hasNewChat: boolean;
};

// 지원 현황 상세 조회 응답
export interface MatchingMyRecruitmentDetailResponse {
  recruitmentDetailInfo: MatchingRecruitmentResponse;
  applyDate: string;
}
