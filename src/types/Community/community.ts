/* 커뮤니티 홈 화면 */
// 커뮤니티 탭 협회 정보 조회 응답
export interface MyAssociationResponse {
  associationId: number;
  associationName: string;
  associationMemberCount: number;
  associationProfileImageUrl: string;
}

// 게시판 정보를 담기 위한 인터페이스
export interface Boards {
  label: string;
  api: string;
  icon: React.ElementType;
}
