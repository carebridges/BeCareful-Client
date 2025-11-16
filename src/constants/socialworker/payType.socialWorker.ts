export const PAY_LABEL_TO_CODE = {
  시급: 'HOUR',
  일급: 'DAY',
  주급: 'WEEK',
  월급: 'MONTH',
  연봉: 'YEAR',
} as const;

export const PAY_CODE_TO_LABEL = {
  HOUR: '시급',
  DAY: '일급',
  WEEK: '주급',
  MONTH: '월급',
  YEAR: '연봉',
} as const;
