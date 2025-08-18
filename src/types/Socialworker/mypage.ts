import { SocialWorkerInfo } from '@/types/Socialworker/common';
import { InstitutionRank } from '@/types/Community/common';

export interface InstitutionInfo {
  institutionCode: string;
  institutionName: string;
  institutionImageUrl: string;
  institutionLastUpdate: string;
  institutionOpenYear: number;
  facilityTypes: string[];
  institutionPhoneNumber: string;
}

export interface SocialworkerMyResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: InstitutionInfo;
  associationName: string;
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
