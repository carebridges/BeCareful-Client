import { WorkDay } from '@/types/Caregiver/common';

export const days = ['월', '화', '수', '목', '금', '토', '일'];

export const DAY_EN_TO_KR: { [key: string]: string } = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

export const DAY_KR_TO_EN: { [key: string]: WorkDay } = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};
