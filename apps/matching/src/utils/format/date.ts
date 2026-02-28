import { ChatResponse } from '@/types/chat';
import { formatDateTime } from '@repo/common';

// 유효한 날짜인지 검증
export const isRealDate = (isoDateString: string | null): boolean => {
  if (!isoDateString || !/^\d{4}-\d{2}-\d{2}$/.test(isoDateString))
    return false;
  const [year, month, day] = isoDateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// 서버 전송용 (YYYY.MM.DD -> YYYY-MM-DD)
export const formatDateToServer = (date: string): string => {
  return date.replace(/\./g, '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
};

// 서버 데이터를 화면용으로 (YYYY-MM-DD -> YYYY.MM.DD)
export const fromBackendDate = (isoDate: string | null): string => {
  if (!isoDate || !isRealDate(isoDate)) return '';
  return isoDate.split('-').join('.');
};

// 시간 포맷 관련 (HH:mm:ss -> HH:mm)
export const formatHHMM = (time: string): string => {
  return time.slice(0, 5);
};

// 채팅 날짜 라벨: 2025년 02월 14일 금요일
export const formatDateLabel = (isoStr: string) => {
  const date = new Date(isoStr.endsWith('Z') ? isoStr : `${isoStr}Z`);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  }).format(date);
};

// 채팅 시간 라벨: 오후 01:32
export const formatTimeLabel = (isoStr: string) => {
  const date = new Date(isoStr.endsWith('Z') ? isoStr : `${isoStr}Z`);
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Seoul',
  }).format(date);
};

// 채팅 데이터 그룹화 및 변형
export const groupByDate = (chat: ChatResponse[]) => {
  const groups: Record<string, ChatResponse[]> = {};
  chat.forEach((c) => {
    const key = formatDateTime(c.sentTime ?? '', true);
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });
  return groups;
};

// 연도 축약 (2025. -> 25.)
export const shortenYear = (dateTime: string) =>
  dateTime.replace(/^\d{2}(\d{2})\./, '$1.');
