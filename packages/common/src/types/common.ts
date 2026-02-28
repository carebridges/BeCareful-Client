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

// ==================== 에러 관련 ====================
export interface ServerErrorResponse {
  message?: string;
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

export type CareTypeKey =
  | '식사보조'
  | '이동보조'
  | '배변보조'
  | '일상생활'
  | '목욕보조'
  | '질병보조';
