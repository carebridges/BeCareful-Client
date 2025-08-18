/* 커뮤니티 공통 타입 */
export type AssociationRank = 'CHAIRMAN' | 'EXECUTIVE' | 'MEMBER';

export type InstitutionRank =
  | 'CENTER_DIRECTOR'
  | 'REPRESENTATIVE'
  | 'SOCIAL_WORKER';

/* 커뮤니티 공통 인터페이스 */
// pageable 파라미터
export interface PageableRequest {
  page: number;
  size: number;
  sort?: string[];
}

// 저자 정보
export interface AuthorInfo {
  authorId: number;
  authorName: string;
  authorInstitutionRank: InstitutionRank;
  institutionImageUrl: string;
}

// 미디어, 파일 항목 구조
export interface MediaItem {
  id: number;
  fileName: string;
  mediaUrl: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  fileSize: number;
  videoDuration: number;
}
