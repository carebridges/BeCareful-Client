import { InstitutionRank } from '@/types/Community/common';

export const INSTITUTION_RANK_EN_TO_KR: { [key: string]: string } = {
  CENTER_DIRECTOR: '센터장',
  REPRESENTATIVE: '대표',
  SOCIAL_WORKER: '사회복지사',
  none: '사회복지사',
};

export const INSTITUTION_RANK_KR_TO_EN: { [key: string]: InstitutionRank } = {
  센터장: 'CENTER_DIRECTOR',
  대표: 'REPRESENTATIVE',
  사회복지사: 'SOCIAL_WORKER',
};

export const INSTITUTION_RANK_EN_TO_RANK: {
  [key: string]: InstitutionRank;
} = {
  CENTER_DIRECTOR: 'CENTER_DIRECTOR',
  REPRESENTATIVE: 'REPRESENTATIVE',
  SOCIAL_WORKER: 'SOCIAL_WORKER',
};

export const INSTITUTION_RANK_LIST = [
  { value: 'CENTER_DIRECTOR', text: '센터장 입니다.' },
  { value: 'REPRESENTATIVE', text: '대표 입니다.' },
  { value: 'SOCIAL_WORKER', text: '사회복지사 입니다.' },
];
