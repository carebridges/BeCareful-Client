import { WorkDay, WorkSalaryUnitType } from '@/types/Caregiver/common';
import { RecruitmentStatus, SalaryUnit } from '@/types/common/matching';
import { Gender } from '@/types/SocialSignUp';

export interface InstitutionInfo {
  institutionId: number;
  institutionCode: string;
  name: string;
  profileImageUrl: string;
  address: string;
}

export interface RecruitmentInfo {
  recruitmentId: number;
  title: string;
  careTypes: string[];
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workLocation: string;
  workSalaryUnitType: SalaryUnit;
  workSalaryAmount: number;
  isRecruiting: boolean;
  institutionInfo: InstitutionInfo;
  createdTime: string;
}

export interface ElderlyInfo {
  elderlyId: number;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: Gender;
  elderlyLocation: string;
  elderlyCareLevel: string;
  elderlyProfileImageUrl?: string;
}

export interface RecruitmentItem {
  recruitmentInfo: RecruitmentInfo;
  elderlyInfo: ElderlyInfo;
  recruitmentStatus: RecruitmentStatus | string;
  matchingCount: number;
  applyCount: number;
}

export interface RecruitmentSearchResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: RecruitmentItem[];
}

export type ElderlyMatchingStatusFilter = '매칭중' | '매칭완료';

export interface RecruitmentDetailResponse {
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
  elderlyInfo: {
    name: string;
    gender: Gender;
    birthDate: string;
    age: number;
    address: string;
    profileImageUrl: string;
    careLevel: string;
    detailCareTypes: {
      careType: string;
      detailCareTypes: string[];
    }[];
    healthCondition: string;
    institutionName: string;
    hasInmate: boolean;
    hasPet: boolean;
  };
  institutionInfo: {
    institutionId: number;
    institutionCode: string;
    name: string;
    profileImageUrl: string;
    address: string;
  };
}
