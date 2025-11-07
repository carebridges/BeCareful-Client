import { SocialWorkerInfo } from '@/types/Socialworker/common';
import { InstitutionRank } from '@/types/Community/common';
import { InstitutionInfo } from '@/types/common/institutionInfo';

export interface SocialMyInstitutionInfo {
  institutionCode: string;
  institutionName: string;
  institutionImageUrl: string;
  institutionLastUpdate: string;
  institutionOpenYear: number;
  facilityTypes: string[];
  institutionPhoneNumber: string;
}

export interface AssociationInfo {
  associationId: number;
  associationName: string;
}

export interface SocialworkerMyResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: SocialMyInstitutionInfo;
  associationInfo: AssociationInfo;
}

export interface SocialworkerMyEditResponse {
  name: string;
  nickName: string;
  birthday: string;
  genderCode: number;
  phoneNumber: string;
  institutionInfo: InstitutionInfo;
  institutionRank: InstitutionRank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export interface SocialworkerMyRequest {
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  nursingInstitutionId: number;
  institutionRank: InstitutionRank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export interface NursingAssociationInfoRequest {
  institutionName: string;
  institutionCode: string;
  openYear: number;
  facilityTypeList: string[];
  phoneNumber: string;
  profileImageUrl: string;
}
