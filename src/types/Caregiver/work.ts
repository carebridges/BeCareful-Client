import {
  WorkDay,
  WorkLocation,
  WorkSalaryUnitType,
  WorkTime,
  WorkApplication,
  ElderlyInfo,
  Recruitment,
  RecruitmentInfo,
  MatchingResultStatus,
  InstitutionInfo,
} from '@/types/Caregiver/common';

/* 요양보호사 일자리 화면 */
// 일자리 신청 정보 조회 응답
export type WorkApplicationResponse = {
  hasNewChat: boolean;
  workApplicationDto: WorkApplication;
};

// 일자리 신청 정보 등록/수정 요청
export type WorkApplicationRequest = {
  workLocations: WorkLocation[];
  workDays: WorkDay[];
  workTimes: WorkTime[];
  careTypes: string[];
  workSalaryAmount: number;
  workSalaryUnitType: WorkSalaryUnitType;
};

// 매칭 공고 리스트 조회 응답
export type MatchingListResponse = Recruitment[];

// 매칭 공고 상세 조회 응답
export interface MatchingRecruitmentResponse {
  recruitmentInfo: RecruitmentInfo;
  elderlyInfo: ElderlyInfo;
  institutionInfo: InstitutionInfo;
  matchingResultStatus: MatchingResultStatus;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
  hasNewChat: boolean;
}

export type MediationType = 'TIME' | 'DAY' | 'PAY';

// 근무 조건 조율 요청
export interface MatchingRecruitmentMediateRequest {
  mediationTypes: MediationType[];
  mediationDescription: string;
}
