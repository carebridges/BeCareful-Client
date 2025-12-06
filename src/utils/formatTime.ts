import { ChatResponse } from '@/types/common/chat';

// "00:00:00" → "00:00" 함수임
export const formatHHMM = (time: string): string => {
  return time.slice(0, 5);
};

// 2025-08-15T08:15:45.072466를 2025.05.05 09:07의 형식으로
export const formatDateTime = (isoStr: string, onlyDate?: boolean) => {
  const utcIsoStr = `${isoStr}Z`;
  const date = new Date(utcIsoStr);

  const yearMonthDay = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);

  const hourMinute = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);

  if (onlyDate) return `${yearMonthDay}`;

  return `${yearMonthDay} ${hourMinute}`;
};

// 채팅에서 사용하는 날짜, 시간 포맷
// 날짜를 "2025년 02월 14일 금요일" 형식으로 변환
export const formatDateLabel = (isoStr: string) => {
  const utcIsoStr = `${isoStr}Z`;
  const date = new Date(utcIsoStr);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  }).format(date);
};

// 시간 "오후 01:32" 형식 변환
export const formatTimeLabel = (isoStr: string) => {
  const utcIsoStr = `${isoStr}Z`;
  const date = new Date(utcIsoStr);
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Seoul',
  }).format(date);
};

// 날짜별 그룹화 함수
export const groupByDate = (chat: ChatResponse[]) => {
  const groups: Record<string, ChatResponse[]> = {};
  chat.forEach((c) => {
    const utcIsoStr = `${c.sentTime ?? new Date().toISOString().slice(0, 23)}Z`;
    const date = new Date(utcIsoStr);

    const key = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul',
    }).format(date);

    if (!groups[key]) groups[key] = [];

    groups[key].push(c);
  });
  return groups;
};

export const shortenYear = (dateTime: string) =>
  dateTime.replace(/^(\d{2})\d{2}\./, '$1.');
