import {
  WorkDay,
  WorkSalaryUnitType,
  WorkTime,
} from '@/types/Caregiver/common';
import { MediationType } from '@/types/Caregiver/work';

/* 요양보호사 관련 mapping 함수들 */
export const Gender_Mapping: { [key: string]: string } = {
  FEMALE: '여성',
  MALE: '남성',
};

export const Day_Mapping: { [key: string]: string } = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

export const API_Day_Mapping: { [key: string]: WorkDay } = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};

export const Time_Mapping: { [key: string]: string } = {
  MORNING: '오전',
  AFTERNOON: '오후',
  EVENING: '저녁',
};

export const API_Time_Mapping: { [key: string]: WorkTime } = {
  오전: 'MORNING',
  오후: 'AFTERNOON',
  저녁: 'EVENING',
};

export const Salary_Type_Mapping: { [key: string]: string } = {
  HOUR: '시급',
  DAY: '일급',
  MONTH: '월급',
  YEAR: '연봉',
};

export const API_Salary_Type_Mapping: {
  [key: string]: WorkSalaryUnitType;
} = {
  시급: 'HOUR',
  일급: 'DAY',
  월급: 'MONTH',
  연봉: 'YEAR',
};

export const API_Mediation_Type_Mapping: {
  [key: string]: MediationType;
} = {
  '시간 조율': 'TIME',
  '급여 조율': 'PAY',
  '요일 조율': 'DAY',
};
