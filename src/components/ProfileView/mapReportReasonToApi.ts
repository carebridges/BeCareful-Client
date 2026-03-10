import { ReportReason } from '@/types/common';

export const mapReportReasonToApi = (reason: ReportReason) => {
  switch (reason) {
    case 'SPAM':
      return '스팸';
    case 'ABUSE':
      return '욕설/비방';
    case 'SEXUAL':
      return '음란물';
    case 'PRIVACY':
      return '개인정보노출';
    case 'OTHER':
      return '기타';
    default:
      return '기타';
  }
};
