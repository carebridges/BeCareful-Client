import { ReportReason } from '@/types/common/profileReport';

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
