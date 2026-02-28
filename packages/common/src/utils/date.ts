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
