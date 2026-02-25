import { ReportReason } from '@/types/common';

// 최근 검색어 최대 개수
export const MAX_RECENT_SEARCHES = 10;

// 업로드하는 미디어 개수/크기 제한
export const MEDIA_LIMITS = {
  PHOTO: { COUNT: 100, SIZE_MB: 30 },
  VIDEO: { COUNT: 10, SIZE_GB: 1, DURATION_MIN: 15 },
  FILE: { COUNT: 5, SIZE_MB: 10, TOTAL_MB: 30 },
} as const;

// 신고 사유
export const REPORT_REASON_OPTIONS: {
  value: ReportReason;
  label: string;
}[] = [
  { value: 'SPAM', label: '스팸 / 부적절한 홍보' },
  { value: 'ABUSE', label: '욕설 / 비방 행위 / 혐오 조장' },
  { value: 'SEXUAL', label: '음란물 / 성적인 괴롭힘' },
  { value: 'PRIVACY', label: '개인정보 노출 / 사칭' },
  { value: 'OTHER', label: '기타 (직접 입력)' },
];
