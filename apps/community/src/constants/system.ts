// 최근 검색어 최대 개수
export const MAX_RECENT_SEARCHES = 10;

// 업로드하는 미디어 개수/크기 제한
export const MEDIA_LIMITS = {
  PHOTO: { COUNT: 100, SIZE_MB: 30 },
  VIDEO: { COUNT: 10, SIZE_GB: 1, DURATION_MIN: 15 },
  FILE: { COUNT: 5, SIZE_MB: 10, TOTAL_MB: 30 },
} as const;
