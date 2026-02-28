'use client';

import { useQueries, useQuery } from '@tanstack/react-query';
import { getPostList } from '@/api/community';
import { BOARD_LIST } from '@/constants/community';
import { PageableRequest, PostListItem } from '@/types/community';

// 특정 게시판의 모든 게시글 리스트 조회
export const useBoardPosts = (boardType: string, pageable: PageableRequest) => {
  return useQuery<PostListItem[]>({
    queryKey: ['postList', boardType, pageable],
    queryFn: () => getPostList(pageable, boardType),
    enabled: boardType !== '전체',
  });
};

// 여러 게시판의 게시글 목록 동시에 조회
export const useMultipleBoardPosts = (pageable: PageableRequest) => {
  return useQueries({
    queries: BOARD_LIST.map((board) => ({
      queryKey: ['postList', board.api, pageable],
      queryFn: () => getPostList(pageable, board.api),
      staleTime: 1000 * 60 * 5, // 5분 동안 stale 상태로 간주
      gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    })),
  });
};
