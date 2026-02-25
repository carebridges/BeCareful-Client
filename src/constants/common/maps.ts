import {
  AssociationRank,
  AssociationRankKR,
  Gender,
  InstitutionRank,
  WorkDay,
  WorkSalaryUnitType,
  WorkTime,
} from '@/types/common';
import { MediationType } from '@/types/matching';

// ==================== 요일 ====================
export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export const DAY_MAP = {
  EN_TO_KR: {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  } as const,

  KR_TO_EN: {
    월: 'MONDAY',
    화: 'TUESDAY',
    수: 'WEDNESDAY',
    목: 'THURSDAY',
    금: 'FRIDAY',
    토: 'SATURDAY',
    일: 'SUNDAY',
  } as Record<string, WorkDay>,
};

// ==================== 시간 ====================
export const TIMES_LONG = [
  '오전 (08:00 ~ 12:00 사이)',
  '오후 (12:01 ~ 18:00 사이)',
  '저녁 (18:01 ~ 22:00 사이)',
] as const;

export const TIME_MAP = {
  EN_TO_KR: {
    MORNING: '오전',
    AFTERNOON: '오후',
    EVENING: '저녁',
    NIGHT: '야간',
  } as const,

  KR_TO_EN: {
    오전: 'MORNING',
    오후: 'AFTERNOON',
    저녁: 'EVENING',
    // 야간: 'NIGHT',
  } as Record<string, WorkTime>,

  EN_TO_LONG: {
    MORNING: '오전 (08:00 ~ 12:00 사이)',
    AFTERNOON: '오후 (12:01 ~ 18:00 사이)',
    EVENING: '저녁 (18:01 ~ 22:00 사이)',
  } as const,

  LONG_TO_EN: {
    '오전 (08:00 ~ 12:00 사이)': 'MORNING',
    '오후 (12:01 ~ 18:00 사이)': 'AFTERNOON',
    '저녁 (18:01 ~ 22:00 사이)': 'EVENING',
  } as Record<string, WorkTime>,
};

// ==================== 급여 ====================
export const MIN_WAGE = 10320;
export const SALARY = ['시급', '일급', '월급', '연봉'];

export const SALARY_MAP = {
  EN_TO_KR: {
    HOUR: '시급',
    DAY: '일급',
    // WEEK: '주급',
    MONTH: '월급',
    YEAR: '연봉',
  } as const,

  KR_TO_EN: {
    시급: 'HOUR',
    일급: 'DAY',
    // 주급: 'WEEK',
    월급: 'MONTH',
    연봉: 'YEAR',
  } as Record<string, WorkSalaryUnitType>,
};

// ==================== 성별 ====================
export const GENDER_MAP = {
  EN_TO_KR_FULL: {
    MALE: '남자',
    FEMALE: '여자',
  } as const,

  EN_TO_KR_SHORT: {
    MALE: '남',
    FEMALE: '여',
  } as const,

  KR_TO_EN: {
    남자: 'MALE',
    여자: 'FEMALE',
    남: 'MALE',
    여: 'FEMALE',
  } as Record<string, Gender>,
};

// ==================== 조율 타입 ====================
export const MEDIATION = ['시간 조율', '급여 조율', '요일 조율'];

export const MEDIATION_MAP = {
  KR_TO_EN: {
    '시간 조율': 'TIME',
    '급여 조율': 'PAY',
    '요일 조율': 'DAY',
  } as Record<string, MediationType>,
};

// ==================== 협회 등급 ====================
export const ASSOCIATION_MEMBER_TYPES: AssociationRankKR[] = ['임원진', '회원'];
// ['회장', '임원진', '회원'];

export const ASSOCIATION_RANK_MAP = {
  EN_TO_KR: {
    CHAIRMAN: '회장',
    EXECUTIVE: '임원진',
    MEMBER: '회원',
    NONE: '회원',
  } as const,

  KR_TO_EN: {
    회장: 'CHAIRMAN',
    임원진: 'EXECUTIVE',
    회원: 'MEMBER',
  } as Record<string, AssociationRank>,
};

export const ASSOCIATION_RANKS = [
  { value: 'CHAIRMAN', label: '회장' },
  { value: 'EXECUTIVE', label: '임원' },
  { value: 'MEMBER', label: '일반 회원' },
  { value: 'NONE', label: '협회 비회원' },
] as const;

export const ASSOCIATION_JOIN_RANKS_LABELS = {
  EXECUTIVE: '임원진 입니다.',
  MEMBER: '회원 입니다.',
} as Partial<Record<AssociationRank, string>>;

// ==================== 기관 직급 ====================
export const INSTITUTION_RANK_MAP = {
  EN_TO_KR: {
    CENTER_DIRECTOR: '센터장',
    REPRESENTATIVE: '대표',
    SOCIAL_WORKER: '사회복지사',
    NONE: '사회복지사',
  } as const,

  KR_TO_EN: {
    센터장: 'CENTER_DIRECTOR',
    대표: 'REPRESENTATIVE',
    사회복지사: 'SOCIAL_WORKER',
  } as Record<string, InstitutionRank>,
};

export const INSTITUTION_RANK_LIST = [
  { value: 'CENTER_DIRECTOR', text: '센터장 입니다.' },
  { value: 'REPRESENTATIVE', text: '대표 입니다.' },
  { value: 'SOCIAL_WORKER', text: '사회복지사 입니다.' },
] as const;
