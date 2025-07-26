import { ASSOCIATION_RANKS } from '@/constants/associationRank';
import { CommunityAccessStatusValue } from '@/constants/communityAssociation';

export interface AssociationWholeList {
  associationId: number;
  associationName: string;
  associationEstablishedYear: number | null;
  associationProfileImageUrl?: string;
  associationMemberCount: number;
}

export interface GetAssociationListResponse {
  count: number;
  associationSimpleDtoList: AssociationWholeList[];
}

export interface JoinAssociationRequest {
  associationId: number;
  associationRank: AssociationRank;
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
