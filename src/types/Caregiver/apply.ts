import { Recruitment } from '@/types/Caregiver/common';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';

/* 요양보호사 지원 현황 화면 */
// 지원 현황 조회 응답
export type MatchingMyRecruitmentResponse = {
  recruitments: Recruitment[];
  hasNewChat: boolean;
};

// 지원 현황 상세 조회 응답
export interface MatchingMyRecruitmentDetailResponse {
  recruitmentDetailInfo: MatchingRecruitmentResponse;
  applyDate: string;
}
