import { InstitutionRank } from '@/types/Community/common';

export const Institution_Rank_Mapping: { [key: string]: string } = {
  CENTER_DIRECTOR: '센터장',
  REPRESENTATIVE: '대표',
  SOCIAL_WORKER: '사회복지사',
  none: '사회복지사',
};

export const API_Institution_Rank_Mapping: { [key: string]: InstitutionRank } =
  {
    센터장: 'CENTER_DIRECTOR',
    대표: 'REPRESENTATIVE',
    사회복지사: 'SOCIAL_WORKER',
  };
