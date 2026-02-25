import {
  Gender,
  MatchingResultStatus,
  RecruitmentStatus,
  WorkDay,
  WorkLocation,
  WorkSalaryUnitType,
  WorkTime,
} from '@/types/common';
import { ElderlyBase, ElderlyDetailInfo } from '@/types/elderly';
import { InstitutionInfo } from '@/types/institution';

export type MediationType = 'TIME' | 'DAY' | 'PAY';

// ==================== 공고 ====================
export interface RecruitmentBase {
  recruitmentId: number;
  title: string;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
}

export interface RecruitmentForm
  extends Omit<RecruitmentBase, 'recruitmentId'> {
  elderlyId: number | null;
  careTypes: string[];
  description: string;
}

export type EditRecruitmentForm = Omit<RecruitmentForm, 'elderlyId'>;

export interface RecruitmentInfo extends RecruitmentBase {
  careTypes: string[];
  workLocation: string;
  isRecruiting: boolean;
  institutionInfo: InstitutionInfo;
  createdTime: string;
}

export interface RecruitmentItem {
  recruitmentInfo: RecruitmentInfo;
  elderlyInfo: ElderlyBase;
  recruitmentStatus: RecruitmentStatus | string;
  matchingCount: number;
  applyCount: number;
}

export interface RecruitmentDetail extends RecruitmentBase {
  recruitmentStatus: RecruitmentStatus;
  description: string;
  createdAt: string;
  elderlyInfo: ElderlyDetailInfo;
  institutionInfo: InstitutionInfo;
}

// ==================== 매칭/지원 ====================
export interface RawMatchingElderData {
  recruitmentInfo: {
    careType: string[];
    workDays: string[];
    workStartTime: string;
    workEndTime: string;
    elderlyInfo: ElderlyDetailInfo;
  };
  matchedCaregivers: RawMatchingCaregiver[];
  appliedCaregivers: RawMatchingCaregiver[];
}

export interface RawMatchingCaregiver {
  caregiverInfo: {
    caregiverInfo: {
      caregiverId: number;
      name: string;
      profileImageUrl: string;
    };
    applicationTitle: string;
  };
  matchingResultStatus: string;
}

export interface MatchingCaregiver {
  caregiverInfo: {
    caregiverId: number;
    profileImageUrl: string;
    name: string;
    applicationTitle: string;
  };
  matchingResultStatus: string;
}

export interface MatchingElderData {
  recruitmentInfo: RawMatchingElderData['recruitmentInfo'];
  matchedCaregivers: MatchingCaregiver[];
  appliedCaregivers: MatchingCaregiver[];
}

export interface ElderMatchingStatus {
  recruitmentId: number;
  elderlyInfo: {
    elderlyName: string;
    elderlyAge: number;
    elderlyGender: Gender;
    elderlyProfileImageUrl: string;
  };
  matchingCount: number;
  applyCount: number;
}

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

// ==================== API ====================
/* 공고 검색 응답 */
export interface RecruitmentSearchResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: RecruitmentItem[];
}

/* 매칭 공고 리스트 아이템 */
export interface Recruitment {
  recruitmentInfo: RecruitmentInfo;
  matchingResultStatus: MatchingResultStatus;
  recruitmentStatus: string;
  isTimeMatched: boolean;
}

export interface RecruitmentListResponse {
  recruitments: Recruitment[];
}

/* 지원 현황 상세 조회 응답 */
export interface MatchingMyRecruitmentDetailResponse {
  recruitmentDetailInfo: MatchingRecruitmentResponse;
  applyDate: string;
  chatRoomId: number;
}

/* 매칭 공고 상세 조회 응답 */
export interface MatchingRecruitmentResponse {
  recruitmentInfo: RecruitmentDetail;
  matchingResultStatus: MatchingResultStatus;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
}

/* 근무 조건 조율 요청 */
export interface MatchingRecruitmentMediateRequest {
  mediationTypes: MediationType[];
  mediationDescription: string;
}

/* 일자리 신청 정보 조회 응답 */
export type WorkApplicationResponse = {
  hasCareer: boolean;
  caregiverName: string;
  workApplicationDto: WorkApplication;
};

/* 일자리 신청 정보 등록/수정 요청 */
export type WorkApplicationRequest = {
  workLocations: WorkLocation[];
  workDays: WorkDay[];
  workTimes: WorkTime[];
  careTypes: string[];
  workSalaryAmount: number;
  workSalaryUnitType: WorkSalaryUnitType;
};
