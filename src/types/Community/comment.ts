import { AuthorInfo } from '@/types/Community/common';

/* 댓글 */
// 댓글 항목
export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  author: AuthorInfo;
  isMyComment: boolean;
}

// 댓글 내용 조회 (댓글 목록)
export type CommentListResponse = Comment[];

// 댓글 등록 요청 본문
export interface CommentRequest {
  content: string;
}
