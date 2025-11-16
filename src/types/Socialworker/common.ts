import { AssociationRank, InstitutionRank } from '@/types/Community/common';

export type AgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo';

export type CommunityAgreeField =
  | 'agreedToTerms'
  | 'agreedToCollectPersonalInfo'
  | 'agreedToReceiveMarketingInfo';

export interface AgreementValues {
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export interface CommunityAgreementValues {
  agreedToTerms: boolean;
  agreedToCollectPersonalInfo: boolean;
  agreedToReceiveMarketingInfo: boolean;
}

export interface SocialWorkerInfo {
  name: string;
  nickName: string;
  profileImageUrl: string;
  phoneNumber: string;
  age: number;
  gender: 'FEMALE' | 'MALE';
  institutionRank: InstitutionRank;
  associationRank: AssociationRank;
}

export interface ElderlyDetail {
  elderlyId: number;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  elderlyLocation: string;
  elderlyCareLevel: string;
  elderlyProfileImageUrl: string;
}
