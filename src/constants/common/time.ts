import { WorkTime } from '@/types/Caregiver/common';

export const times = ['오전', '오후', '저녁'];

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
