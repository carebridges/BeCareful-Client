import { WorkDay, WorkSalaryUnitType } from '@/types/Caregiver/common';
import { RecruitmentStatus, SalaryUnit } from '@/types/common/matching';
import { ElderDetailCareType } from '@/types/Elderly';
import { Gender } from '@/types/SocialSignUp';

export interface RecruitmentItem {
  recruitmentInfo: {
    recruitmentId: number;
    title: string;
    recruitmentStatus: RecruitmentStatus;
    workDays: WorkDay[];
    workStartTime: string;
    workEndTime: string;
    workSalaryUnitType: SalaryUnit;
    workSalaryAmount: number;
    description: string;
    createdAt: string;
    elderlyInfo: {
      name: string;
      gender: Gender;
      age: number;
      address: string;
      profileImageUrl?: string;
      detailCareTypes?: ElderDetailCareType[];
    };
  };
  elderlyInfo: {
    elderlyId: number;
    elderlyName: string;
    elderlyAge: number;
    elderlyGender: Gender;
    elderlyLocation: string;
    elderlyCareLevel: string;
    elderlyProfileImageUrl?: string;
  };
  matchingCount: number;
  applyCount: number;
}

export interface RecruitmentSearchResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
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
