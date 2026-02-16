import { DAY_MAP } from '@/constants/common/maps';

//요일 영어로 오면 월, 수 이런 느낌의 함수
export const translateWorkDaysToKo = (days: string[]): string => {
  return days
    .map((day) => DAY_MAP.EN_TO_KR[day as keyof typeof DAY_MAP.EN_TO_KR] || day)
    .join(', ');
};

export const sortWorkDays = (days: string[]): string[] => {
  const order = Object.keys(DAY_MAP.EN_TO_KR);
  return [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));
};
