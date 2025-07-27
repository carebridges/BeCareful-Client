/* 회원 관리 - 회원 */
export interface Member {
  memberId: number;
  name: string;
  phoneNumber: string;
  associationRank: 'CHAIRMAN' | 'EXECUTIVE' | 'MEMBER';
  institutionName: string;
  institutionRank: 'CENTER_DIRECTOR' | 'REPRESENTATIVE' | 'SOCIAL_WORKER';
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
  institutionLastUpdate: string;
  facilityTypes: string[];
  institutionPhoneNumber: string;
  associationName: string;
  associationRank: 'CHAIRMAN' | 'EXECUTIVE' | 'MEMBER';
  institutionRank: 'CENTER_DIRECTOR' | 'REPRESENTATIVE' | 'SOCIAL_WORKER';
}

/* 회원 관리 - 가입 신청 */
export interface Application {
  joinApplicationId: number;
  name: string;
  associationRank: 'CHAIRMAN' | 'EXECUTIVE' | 'MEMBER';
  institutionName: string;
  institutionRank: 'CENTER_DIRECTOR' | 'REPRESENTATIVE' | 'SOCIAL_WORKER';
  institutionImageUrl: string;
}

// 협회 가입 신청 목록 보기
export interface JoinRequestsResponse {
  count: number;
  applications: Application[];
}
