import { getPostingList } from '@/api/community';
import { BOARD_LIST } from '@/constants/community/communityBoard';
import { PageableRequest } from '@/types/Community/common';
import { useQueries } from '@tanstack/react-query';

// 여러 게시판의 게시글 목록 동시에 조회
// 특정 게시판의 모든 게시글 리스트 조회 api 이용
export const useBoardPostings = (pageable: PageableRequest) => {
  return useQueries({
    queries: BOARD_LIST.map((board) => ({
      queryKey: ['boardPostingList', board.api, pageable],
      queryFn: () => getPostingList(pageable, board.api),
      staleTime: 1000 * 60 * 5, // 5분 동안 stale 상태로 간주
      gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    })),
  });
};
