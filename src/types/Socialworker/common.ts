import { AssociationRank, InstitutionRank } from '@/types/Community/common';

export type AgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo';

export interface AgreementValues {
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export interface SocialWorkerInfo {
  name: string;
  nickName: string;
  phoneNumber: string;
  age: number;
  gender: 'FEMALE' | 'MALE';
  institutionRank: InstitutionRank;
  associationRank: AssociationRank;
}
