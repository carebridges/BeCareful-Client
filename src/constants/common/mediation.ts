import { MediationType } from '@/types/Caregiver/work';

export const MEDIATION_KR_TO_EN: {
  [key: string]: MediationType;
} = {
  '시간 조율': 'TIME',
  '급여 조율': 'PAY',
  '요일 조율': 'DAY',
};
