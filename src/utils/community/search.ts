import { BoardPostListResponse } from '@/types/Community/post';

/* CommnunitySearchPage */
// 주어진 검색어와 데이터 목록을 기반으로 게시글 검색
export const searchPost = (
  query: string,
  data: BoardPostListResponse,
): BoardPostListResponse => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return []; // 검색어가 없으면 빈 배열 반환
  }

  return data.filter(
    (item) =>
      item.title.includes(trimmedQuery) || // title 필드 검색
      item.author.authorName.includes(trimmedQuery), // authorName 필드 검색
  );
};
