import { Contract } from '@/types/Common/chat';

// "00:00:00" → "00:00" 함수임
export const formatHHMM = (time: string): string => {
  return time.slice(0, 5);
};

// 채팅에서 사용하는 날짜, 시간 포맷
// 날짜를 "2025년 02월 14일 금요일" 형식으로 변환
export const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  }).format(date);
};

// 2025-08-15T08:15:45.072466를 2025.05.05 09:07의 형식으로
export const formatDateTime = (isoStr: string) => {
  const date = new Date(isoStr);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

// 시간 "오후 01:32" 형식 변환
export const formatTimeLabel = (isoStr: string) => {
  const date = new Date(isoStr);
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Seoul',
  }).format(date);
};

// 날짜별 그룹화 함수
export const groupByDate = (contracts: Contract[]) => {
  return contracts.reduce<Record<string, Contract[]>>((acc, contract) => {
    const dateKey = contract.workStartDate;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(contract);
    return acc;
  }, {});
};
