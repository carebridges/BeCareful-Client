import { InstitutionInfo } from '@/types/common/institutionInfo';

// 근무 요일
export type WorkDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

// 근무 시간대
export type WorkTime = 'MORNING' | 'AFTERNOON' | 'EVENING';

// 급여 단위
export type WorkSalaryUnitType = 'HOUR' | 'DAY' | 'MONTH' | 'YEAR';

// 매칭 결과
export type MatchingResultStatus = '높음' | '보통' | '낮음';

export type RecruitmentStatus = '모집중' | '모집완료' | '공고마감';

/* 공통 인터페이스 정의 */
// 근무 지역
export interface WorkLocation {
  siDo: string;
  siGuGun: string;
  eupMyeonDong: string;
}

// 케어타입
export interface CareType {
  careType: string;
  detailCareTypes: string[];
}

// 자격증 정보
export interface CertificateInfo {
  grade: 'FIRST' | 'SECOND' | 'none';
  certificateNumber: string;
}

// 지원 정보
export interface WorkApplication {
  workApplicationId: number;
  isActive: boolean;
  careTypes: string[];
  workDays: WorkDay[];
  workTimes: WorkTime[];
  workSalaryAmount: number;
  workSalaryUnitType: WorkSalaryUnitType;
  lastModifiedDate: string;
  workLocations: WorkLocation[];
}

// 매칭 공고
export interface RecruitmentInfo {
  recruitmentId: number;
  title: string;
  careTypes: CareType[];
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workLocation: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  isRecruiting: boolean;
  institutionInfo: InstitutionInfo;
  createdTime: string;
}

export interface MyRecruitmentInfo {
  recruitmentId: number;
  title: string;
  recruitmentStatus: RecruitmentStatus;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  description: string;
  createdAt: string;
  elderlyInfo: ElderlyInfo;
  institutionInfo: InstitutionInfo;
}

// 매칭 공고 리스트
export interface Recruitment {
  recruitmentInfo: RecruitmentInfo;
  matchingResultStatus: MatchingResultStatus;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
}

// 어르신 정보
export interface ElderlyInfo {
  name: string;
  gender: 'MALE' | 'FEMALE';
  bitrhDate: string;
  age: number;
  address: string;
  profileImageUrl: string;
  careLevel: string;
  detailCareTypes: CareType[];
  healthCondition: string;
  institutionName: string;
  hasInmate: boolean;
  hasPet: boolean;
}
