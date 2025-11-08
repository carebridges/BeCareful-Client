import { ASSOCIATION_RANKS } from '@/constants/common/associationRank';
import { CommunityAccessStatusValue } from '@/constants/community/communityAssociation';

export interface AssociationWholeList {
  associationId: number;
  associationName: string;
  associationEstablishedYear: number | null;
  associationProfileImageUrl?: string;
  associationMemberCount: number;
}

export interface GetAssociationListResponse {
  count: number;
  associationResponseList: AssociationWholeList[];
}
export interface JoinAssociationRequest {
  associationId: number;
  associationRank: AssociationRank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export type AssociationRank = (typeof ASSOCIATION_RANKS)[number]['value'];

export interface CommunityAccessResponse {
  accessStatus: CommunityAccessStatusValue;
  associationName: string;
  associationInfo: {
    associationId: number;
    associationName: string;
    associationMemberCount: number;
  };
}

export type CommunityAgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo'; //임시 Todo
