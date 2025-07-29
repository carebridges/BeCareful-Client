import { SocialWorkerInfo } from '@/types/Socialworker/common';
import { InstitutionRank } from '@/types/Community/common';

interface InstitutionInfo {
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
