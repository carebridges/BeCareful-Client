import React from 'react';

// ==================== 공공 API ====================
export type PublicApiDto = {
  longTermAdminSym?: string;
  adminNm?: string;
  siDoCd?: string | number;
  siGunGuCd?: string | number;
};

// ==================== presigned 관련 ====================
export interface UploadResult {
  tempKey: string;
  previewUrl: string;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  tempKey: string;
  presignedUrl: string;
}

export interface MediaPresignedUrlRequest {
  fileName: string;
  fileSize: number;
  contentType: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  videoDuration?: number;
}
// ==================== 신고/차단 관련 ====================
export type ReportReason = 'SPAM' | 'ABUSE' | 'SEXUAL' | 'PRIVACY' | 'OTHER';
export type ProfileActionOption = 'report' | 'block';
export type ReportRequest = {
  reason: ReportReason;
  detail?: string;
};

// ==================== 에러 관련 ====================
export interface ServerErrorResponse {
  message?: string;
}

// ==================== 온보딩 관련 ====================
export interface OnboardingItem {
  id: number;
  title: string;
  detail: string;
  image: string;
  buttonText: string;
}

// ==================== 사용자 타입 ====================
export type Gender = 'MALE' | 'FEMALE';
export type UserRole = 'CAREGIVER' | 'SOCIAL_WORKER';

export type Rank = 'MANAGER' | 'SOCIALWORKER' | ''; // TODO
export type AssociationRank = 'CHAIRMAN' | 'EXECUTIVE' | 'MEMBER' | 'NONE';
export type AssociationRankKR = '회장' | '임원진' | '회원';

export type InstitutionRank =
  | 'CENTER_DIRECTOR'
  | 'REPRESENTATIVE'
  | 'SOCIAL_WORKER'
  | 'NONE';

// ==================== 공고/매칭 관련 ====================
export type MatchingResultStatus = '높음' | '보통' | '낮음';
export type RecruitmentStatus = '모집중' | '모집완료' | '조율중' | '공고마감';

export interface MatchingCareTypeOption {
  key: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// ==================== 공통 근무 타입 ====================
export type CareLevel =
  | '1등급'
  | '2등급'
  | '3등급'
  | '4등급'
  | '5등급'
  | '인지지원등급'
  | '등급없음';

export type CareTypeKey =
  | '식사보조'
  | '이동보조'
  | '배변보조'
  | '일상생활'
  | '목욕보조'
  | '질병보조';

export interface CareType {
  careType: string;
  detailCareTypes: string[];
}

export type WorkTime = 'MORNING' | 'AFTERNOON' | 'EVENING';

export type WorkSalaryUnitType = 'HOUR' | 'DAY' | 'MONTH' | 'YEAR';
export type WorkSalaryUnitTypeKR = '시급' | '일급' | '월급' | '연봉';

export type WorkDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface WorkLocation {
  siDo: string;
  siGuGun: string;
  eupMyeonDong: string;
}

// ==================== 지역 데이터 ====================
export interface AreaSelectData {
  name: string;
  gu: {
    name: string;
    dong: string[];
  }[];
}

export interface Address {
  streetAddress: string;
  detailAddress: string;
}

export type ProfileViewData = {
  profileType: 'institution' | 'caregiver';
  joinedDate: string;
  name: string;
  profileImageUrl: string;
  subText: string;
};
