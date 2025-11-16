export type WorkDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type RecruitmentStatus = '모집중' | '모집완료' | '조율중' | '마감';
export type SalaryUnit = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface AreaSocial {
  siDo: string;
  siGuGun: string;
  eupMyeonDong: string;
}

export interface AreaSelectData {
  name: string;
  gu: {
    name: string;
    dong: string[];
  }[];
}
