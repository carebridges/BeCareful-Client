import { CertificateInfo, WorkApplication } from '@/types/Caregiver/common';

/* 요양보호사 마이페이지 */
// 요양보호사 정보
export interface CaregiverDetailInfo {
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate: CertificateInfo;
  nursingCareCertificate: CertificateInfo;
  havingCar: boolean;
  completeDementiaEducation: boolean;
  certificateNames: string[];
}
export interface CaregiverInfo {
  caregiverId: number;
  name: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  profileImageUrl: string;
  caregiverDetailInfo: CaregiverDetailInfo;
  certificates: string[];
}

// 요양보호사 경력 정보
export interface CareerInfo {
  careerId: number;
  careerTitle: string;
  lastModifiedDate: string;
}

// 요양보호사 마이페이지 데이터 조회 응답
export interface CaregiverMyResponse {
  caregiverInfo: CaregiverInfo;
  careerInfo: CareerInfo;
  workApplicationInfo: WorkApplication;
}

// 요양보호사 마이페이지 수정
export interface CaregiverMyRequest {
  phoneNumber: string;
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate: CertificateInfo;
  nursingCareCertificate: CertificateInfo;
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
}

/* 요양보호사 경력서 */
export interface CareerDetail {
  workInstitution: string;
  workYear: string;
}

// 경력서 조회 응답
export interface CareerResponse {
  title: string;
  careerType: '신입' | '경력';
  introduce: string;
  careerDetails: CareerDetail[];
}

// 경력서 등록 및 수정 요청
export interface CareerRequest {
  title: string;
  careerType: '신입' | '경력';
  introduce: string;
  careerDetails: CareerDetail[];
}
