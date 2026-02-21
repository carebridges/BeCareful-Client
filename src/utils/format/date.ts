import { ChatResponse } from '@/types/common/chat';

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

// ISO 일시 포맷 (ISO -> YYYY.MM.DD HH:mm)
export const formatDateTime = (isoStr: string, onlyDate?: boolean) => {
  const utcIsoStr = isoStr.endsWith('Z') ? isoStr : `${isoStr}Z`;
  const date = new Date(utcIsoStr);

  const yearMonthDay = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);

  if (onlyDate) return yearMonthDay;

  const hourMinute = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);

  return `${yearMonthDay} ${hourMinute}`;
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

// 오늘 날짜 일시
export const getTodayDate = () => {
  const today = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')} ${week[today.getDay()]}요일`;
};

export const getTodayDateTime = () => {
  const today = new Date();
  return `${today.getFullYear()}년 ${(today.getMonth() + 1).toString().padStart(2, '0')}월 ${today.getDate().toString().padStart(2, '0')}일 ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
};
