import { BaseUserInfo } from '@/types/user';
import { Address, Gender, WorkDay } from '@/types/common';
import { ElderlyDetailInfo } from '@/types/elderly';
import { WorkApplication } from '@/types/matching';

// ==================== 경력/자격증 ====================
export interface CareerDetail {
  workInstitution: string;
  workYear: string;
}

export interface CareerInfo {
  careerId: number;
  title: string;
  careerType: '신입' | '경력';
  introduce: string;
  lastModifiedDate: string;
  careerDetails: CareerDetail[];
}

export interface CareerRequest {
  title: string;
  careerType: '신입' | '경력';
  introduce: string;
  careerDetails: CareerDetail[];
}

export type CertificateKey =
  | 'caregiverCertificate'
  | 'nursingCareCertificate'
  | 'socialWorkerCertificate';

export type CertificateFormInput = {
  certificateType: string;
  certificateLevel?: string;
  certificateNumber: string;
};

export interface CertificateInfo {
  grade?: 'FIRST' | 'SECOND' | 'none';
  certificateNumber: string;
}

// ==================== 요양보호사 ====================
export interface CaregiverInfo extends BaseUserInfo {
  caregiverId: number;
  birthday: string;
  address: Address;
  caregiverDetailInfo: CaregiverDetailInfo;
  certificates: string[];
}

export interface CaregiverDetailInfo {
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate: CertificateInfo;
  nursingCareCertificate: CertificateInfo;
  certificateNames: string[];
  havingCar: boolean;
  completeDementiaEducation: boolean;
}

// ==================== 홈 ====================
export interface WorkSchedule {
  workStartTime: string;
  workEndTime: string;
  seniorName: string;
  seniorGender: Gender;
  seniorAge: number;
  seniorCareType: string[];
  workLocation: string;
}

export interface CaregiverHomeResponse {
  name: string;
  applicationCount: number;
  recruitmentCount: number;
  workScheduleList: WorkSchedule[];
  isWorking: boolean;
  isApplying: boolean;
}

export interface CaregiverCompletedMatching {
  id: number;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  careTypes: string[];
  note: string;
  elderlyInfo: ElderlyDetailInfo;
}

export interface MemoEditRequest {
  note: string;
}

// ==================== 마이페이지 ====================
export interface CaregiverProfileRequest {
  profileImageTempKey: string | null;
  caregiverCertificate: CertificateInfo | null;
  socialWorkerCertificate: CertificateInfo | null;
  nursingCareCertificate: CertificateInfo | null;
  address: Address;
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
}

export interface CaregiverProfileResponse {
  caregiverInfo: CaregiverInfo;
  careerInfo: CareerInfo;
  workApplicationInfo: WorkApplication;
}

// ==================== 사회복지사 - 차단한 요양보호사 ====================
export interface BlockCaregiverInfo extends Omit<BaseUserInfo, 'phoneNumber'> {
  caregiverId: number;
}
