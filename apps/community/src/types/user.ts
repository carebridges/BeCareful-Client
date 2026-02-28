import {
  AssociationBase,
  AssociationRank,
  Gender,
  InstitutionRank,
} from '@repo/common';

export interface BaseUserInfo {
  name: string;
  phoneNumber: string;
  gender: Gender;
  age: number;
  profileImageUrl: string;
}

export interface SocialWorkerInfo extends BaseUserInfo {
  nickName: string;
  institutionRank: InstitutionRank;
  associationRank: AssociationRank;
}

export interface SocialworkerInstitutionInfo {
  institutionCode: string;
  institutionName: string;
  institutionImageUrl: string;
  institutionLastUpdate: string;
  institutionOpenYear: number;
  facilityTypes: string[];
  institutionPhoneNumber: string;
}

// ==================== 마이페이지 ====================
export interface SocialworkerProfileResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: SocialworkerInstitutionInfo;
  associationInfo: AssociationBase;
}
