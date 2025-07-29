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
} from '@/types/Caregiver/common';

/* 요양보호사 일자리 화면 */
// 일자리 신청 정보 조회 응답
export type WorkApplicationResponse = WorkApplication;

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

interface InstitutionInfo {
  institutionName: string;
  institutionImageUrl: string;
  institutionLastUpdate: string;
  institutionOpenYear: number;
  facilityTypes: string[];
  institutionPhoneNumber: string;
}

// 매칭 공고 상세 조회 응답
export interface MatchingRecruitmentResponse {
  recruitmentInfo: RecruitmentInfo;
  elderlyInfo: ElderlyInfo;
  institutionInfo: InstitutionInfo;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
  // TODO : 백엔드 타입 확인
  matchingResultStatus: MatchingResultStatus;
}

export type MediationType = 'TIME' | 'DAY' | 'PAY';

// 근무 조건 조율 요청
export interface MatchingRecruitmentMediateRequest {
  mediationTypes: MediationType[];
  mediationDescription: string;
}
