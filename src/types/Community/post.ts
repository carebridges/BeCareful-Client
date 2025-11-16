import { AuthorInfo, MediaItem, MediaItemRequest } from './common';

/* 게시글 */
// 특정 게시글 상세 조회
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

// 게시글 작성
export interface PostPostRequest {
  title: string;
  content: string;
  isImportant: boolean;
  originalUrl: string;
  imageList: MediaItemRequest[];
  videoList: MediaItemRequest[];
  fileList: MediaItemRequest[];
}

// 게시글 수정
export interface PostPutRequest {
  title: string;
  content: string;
  deleteMediaIdList: number[];
  isImportant: boolean;
  originalUrl: string;
  imageList: MediaItemRequest[];
  videoList: MediaItemRequest[];
  fileList: MediaItemRequest[];
}

export type BoardList =
  | 'association-notice'
  | 'service-notice'
  | 'information-sharing';

// 게시글 목록 항목 (특정 게시판 목록 및 필독 게시글 목록에서 사용)
export interface PostListItem {
  postId: number;
  title: string;
  boardType: BoardList;
  isImportant: boolean;
  thumbnailUrl: string;
  createdAt: string;
  author: AuthorInfo;
}

// 특정 게시판의 모든 게시글 리스트 조회
export type BoardPostListResponse = PostListItem[];

// 모든 게시판의 필독 게시글 모아보기
export type ImportantPostListResponse = PostListItem[];
