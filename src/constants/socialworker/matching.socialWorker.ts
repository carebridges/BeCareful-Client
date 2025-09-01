export const MATCH_REASON_KEYS = {
  LOCATION: 'workLocationMatchingResultReason',
  DAYS: 'workDaysMatchingResultReason',
  TIME: 'workTimeMatchingResultReason',
} as const;

export const MATCH_REASON_TEXT = {
  [MATCH_REASON_KEYS.LOCATION]: '근무지역이 일부 일치해요',
  [MATCH_REASON_KEYS.DAYS]: '근무요일이 모두 일치해요',
  [MATCH_REASON_KEYS.TIME]: '근무시간이 일부 일치해요',
} as const;
