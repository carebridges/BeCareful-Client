import { AssociationRank, InstitutionRank } from '@/types/Community/common';

/* 협회 정보 조회 */
export interface AssociationInfoResponse {
  associationName: string;
  associationEstablishedYear: number;
  associationMemberCount: number;
  associationProfileImageUrl: string;
  chairmanRealName: string;
  chairmanNickName: string;
  chairmanPhoneNumber: string;
}

/* 협회 정보 수정 */
export interface AssociationInfoRequest {
  associationImageUrl: string;
  associationName: string;
  associationEstablishedYear: number;
}

/* 회장 정보 수정 */
export interface AssociationChairmanRequest {
  newChairmanId: number;
  nextRankOfCurrentChairman: AssociationRank;
}

/* 회원 관리 - 회원 */
export interface Member {
  memberId: number;
  name: string;
  phoneNumber: string;
  associationRank: AssociationRank;
  institutionName: string;
  institutionRank: InstitutionRank;
  institutionImageUrl: string;
}

// 협회 회원 수, 가입 신청서 개수 반환
export interface MembersOverviewResponse {
  memberCount: number;
  pendingApplicationCount: number;
}

// 협회 회원 목록 조회
export interface MembersResponse {
  count: number;
  members: Member[];
}

/* 회원 관리 - 상세 */
// 협회 회원 상세 정보 조회
export interface MemberDetailResponse {
  memberId: number;
  name: string;
  nickName: string;
  phoneNumber: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  institutionImageUrl: string;
  institutionName: string;
  institutionOpenYear: number;
  institutionLastUpdate: string;
  facilityTypes: string[];
  institutionPhoneNumber: string;
  associationName: string;
  associationRank: AssociationRank;
  institutionRank: InstitutionRank;
}

// 회원 등급 변경
export interface MemberRankRequest {
  memberId: number;
  associationRank: AssociationRank;
}

/* 회원 관리 - 가입 신청 */
export interface Application {
  joinApplicationId: number;
  name: string;
  associationRank: AssociationRank;
  institutionName: string;
  institutionRank: InstitutionRank;
  institutionImageUrl: string;
}

// 협회 가입 신청 목록 보기
export interface JoinRequestsResponse {
  count: number;
  applications: Application[];
}
