import { AuthorInfo, MediaItem } from './common';

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

// 게시글 작성 및 수정(요청 구조 동일)
export interface PostRequest {
  title: string;
  content: string;
  isImportant: boolean;
  originalUrl: string;
  imageList: MediaItem[];
  videoList: MediaItem[];
  fileList: MediaItem[];
}

// 게시글 목록 항목 (특정 게시판 목록 및 필독 게시글 목록에서 사용)
export interface PostListItem {
  postId: number;
  title: string;
  isImportant: boolean;
  thumbnailUrl: string;
  createdAt: string;
  author: AuthorInfo;
}

// 특정 게시판의 모든 게시글 리스트 조회
export type BoardPostListResponse = PostListItem[];

// 모든 게시판의 필독 게시글 모아보기
export type ImportantPostListResponse = PostListItem[];
