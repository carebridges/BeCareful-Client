import { getPostingList } from '@/api/community';
import { PageableRequest } from '@/types/Community/common';
import { BoardPostListResponse } from '@/types/Community/post';
import { useQuery } from '@tanstack/react-query';

// 특정 게시판의 모든 게시글 리스트 조회
export const useBoardPostList = (
  boardType: string,
  pageable: PageableRequest,
) => {
  return useQuery<BoardPostListResponse, Error>({
    queryKey: ['postingList', boardType, pageable],
    queryFn: () => getPostingList(pageable, boardType),
    enabled: boardType !== '전체',
  });
};
