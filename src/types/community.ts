import { AssociationInfo } from '@/types/association';
import { InstitutionRank } from '@/types/common';

// ==================== 커뮤니티 접근 상태 ====================
export type CommunityAccessStatus =
  | 'ALREADY_APPROVED'
  | 'APPROVED'
  | 'REJECTED'
  | 'PENDING'
  | 'NOT_APPLIED';

export interface CommunityAccessResponse {
  accessStatus: CommunityAccessStatus;
  associationName: string;
  associationInfo: AssociationInfo;
}

// ==================== 커뮤니티 홈 ====================
export interface CommunityHomeResponse {
  associationInfo: AssociationInfo;
}

// ==================== 게시판 ====================
export type BoardType =
  | 'association-notice'
  | 'service-notice'
  | 'information-sharing';

export interface Boards {
  label: string;
  api: string;
  icon: React.ElementType;
}

// ==================== 페이지네이션 ====================
export interface PageableRequest {
  page: number;
  size: number;
  sort?: string[];
}

// ==================== 미디어 ====================
export interface MediaItem {
  id: number;
  fileName: string;
  mediaUrl: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  fileSize: number;
  videoDuration?: number;
}

export interface MediaItemRequest {
  fileName: string;
  tempKey: string;
  fileType: 'FILE' | 'IMAGE' | 'VIDEO';
  fileSize: number;
  videoDuration?: number;
}

// ==================== 작성자 정보 ====================
export interface AuthorInfo {
  authorId: number;
  authorName: string;
  authorInstitutionRank: InstitutionRank;
  institutionImageUrl: string;
}

// ==================== 게시글 ====================
/* 게시글 목록 항목 (특정 게시판 목록 및 필독 게시글 목록에서 사용) */
export interface PostListItem {
  postId: number;
  title: string;
  boardType: BoardType;
  isImportant: boolean;
  thumbnailUrl: string;
  createdAt: string;
  author: AuthorInfo;
}

/* 특정 게시글 상세 조회 */
export interface PostDetailResponse {
  postId: number;
  title: string;
  content: string;
  isImportant: boolean;
  isEdited: boolean;
  postedDate: string;
  author: AuthorInfo;
  imageList: MediaItem[];
  videoList: MediaItem[];
  fileUList: MediaItem[];
  isMyPost: boolean;
  originalUrl: string;
}

/* 게시글 작성 */
export interface PostCreateRequest {
  title: string;
  content: string;
  isImportant: boolean;
  originalUrl: string;
  imageList: MediaItemRequest[];
  videoList: MediaItemRequest[];
  fileList: MediaItemRequest[];
}

/* 게시글 수정 */
export interface PostUpdateRequest extends PostCreateRequest {
  deleteMediaIdList: number[];
}

// ==================== 댓글 ====================
export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: AuthorInfo;
  isUpdated: boolean;
  isMyComment: boolean;
}

export interface CommentRequest {
  content: string;
}
