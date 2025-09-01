import { DAY_EN_TO_KO } from '@/constants/socialworker/day.socialWorker';

//요일 영어로 오면 월, 수 이런 느낌의 함수
export const translateWorkDaysToKo = (days: string[]): string => {
  return days
    .map((day) => DAY_EN_TO_KO[day as keyof typeof DAY_EN_TO_KO] || day)
    .join(', ');
};
