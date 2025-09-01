import { WorkSalaryUnitType } from '@/types/Caregiver/common';

export const salaryTypes = ['시급', '일급', '월급', '연봉'];

export const SALARY_EN_TO_KR: { [key: string]: string } = {
  HOUR: '시급',
  DAY: '일급',
  MONTH: '월급',
  YEAR: '연봉',
};

export const SALARY_KR_TO_EN: {
  [key: string]: WorkSalaryUnitType;
} = {
  시급: 'HOUR',
  일급: 'DAY',
  월급: 'MONTH',
  연봉: 'YEAR',
};
