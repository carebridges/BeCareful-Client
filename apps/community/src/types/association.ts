import {
  AssociationInfo,
  AssociationRank,
  InstitutionRank,
} from '@repo/common';

// ==================== 협회 ====================
export interface AssociationInfoResponse extends AssociationInfo {
  associationEstablishedYear: number;
  chairmanRealName: string;
  chairmanNickName: string;
  chairmanPhoneNumber: string;
}

export interface AssociationWholeList extends AssociationInfo {
  associationEstablishedYear: number | null;
}

export interface AssociationListResponse {
  count: number;
  associationResponseList: AssociationWholeList[];
}

// ==================== 협회 관리 ====================
/* 협회 가입 신청 */
export interface JoinAssociationRequest {
  associationId: number;
  associationRank: AssociationRank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

/* 협회 정보 수정 */
export interface AssociationUpdateRequest {
  profileImageTempKey: string | null;
  associationName: string;
  associationEstablishedYear: number;
}

/* 회장 정보 수정 */
export interface ChairmanDelegateRequest {
  newChairmanId: number;
  newChairmanName: string;
  nextRankOfCurrentChairman: AssociationRank;
}

/* 회원 등급 변경 */
export interface MemberRankRequest {
  memberId: number;
  associationRank: AssociationRank;
}

// ==================== 협회 회원 ====================
/* 회원 관리 - 회원 */
export interface AssociationMember {
  memberId: number;
  name: string;
  phoneNumber: string;
  associationRank: AssociationRank;
  institutionName: string;
  institutionRank: InstitutionRank;
  institutionImageUrl: string;
}

/* 협회 회원 목록 조회 */
export interface MembersResponse {
  count: number;
  members: AssociationMember[];
}

/* 협회 회원 수, 가입 신청서 개수 반환 */
export interface MembersOverviewResponse {
  memberCount: number;
  pendingApplicationCount: number;
}

/* 회원 관리 - 협회 회원 상세 정보 조회 */
export interface MemberDetailResponse extends AssociationMember {
  nickName: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  institutionOpenYear: number;
  institutionLastUpdate: string;
  facilityTypes: string[];
  institutionPhoneNumber: string;
  associationName: string;
}

/* 가입 신청 */
export interface Applications {
  joinApplicationId: number;
  name: string;
  associationRank: AssociationRank;
  institutionName: string;
  institutionRank: InstitutionRank;
  institutionImageUrl: string;
}

/* 협회 가입 신청 목록 보기 */
export interface JoinRequestsResponse {
  count: number;
  applications: Applications[];
}
