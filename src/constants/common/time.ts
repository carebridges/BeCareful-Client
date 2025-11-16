import { WorkTime } from '@/types/Caregiver/common';

export const TIMES_LONG = [
  '오전 (08:00 ~ 12:00 사이)',
  '오후 (12:01 ~ 18:00 사이)',
  '저녁 (18:01 ~ 22:00 사이)',
];

export const TIMES_LONG_TO_SHORT: { [key: string]: string } = {
  '오전 (08:00 ~ 12:00 사이)': '오전',
  '오후 (12:01 ~ 18:00 사이)': '오후',
  '저녁 (18:01 ~ 22:00 사이)': '저녁',
};

export const TIME_EN_TO_LONG: { [key: string]: string } = {
  MORNING: '오전 (08:00 ~ 12:00 사이)',
  AFTERNOON: '오후 (12:01 ~ 18:00 사이)',
  EVENING: '저녁 (18:01 ~ 22:00 사이)',
};

export const TIME_EN_TO_KR: { [key: string]: string } = {
  MORNING: '오전',
  AFTERNOON: '오후',
  EVENING: '저녁',
};

export const TIME_KR_TO_EN: { [key: string]: WorkTime } = {
  오전: 'MORNING',
  오후: 'AFTERNOON',
  저녁: 'EVENING',
};
