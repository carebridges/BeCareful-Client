import {
  AssociationRank,
  AssociationRankKR,
  Gender,
  InstitutionRank,
} from '@repo/common';

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
