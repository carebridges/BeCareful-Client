// 사용자 입력을 받아 'YYYY.MM.DD' 형식으로 포맷
export const formatDateInput = (input: string): string => {
  const digitsOnly = input.replace(/[^0-9]/g, '');
  let formatted = '';

  if (digitsOnly.length > 0) {
    formatted += digitsOnly.substring(0, 4);
  }
  if (digitsOnly.length > 4) {
    formatted += '.' + digitsOnly.substring(4, 6);
  }
  if (digitsOnly.length > 6) {
    formatted += '.' + digitsOnly.substring(6, 8);
  }

  return formatted;
};

// 'YYYY.MM.DD' 형식을 'YYYY-MM-DD' 형식으로 포맷
export const formatDateToServer = (date: string): string => {
  date = date.replace(/\./g, '');

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  return `${year}-${month}-${day}`;
};

// 'YYYY-MM-DD' 형식의 문자열이 유효한 실제 날짜인지 검사
export const isRealDate = (isoDateString: string | null): boolean => {
  if (!isoDateString) return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(isoDateString)) {
    return false;
  }

  const [year, month, day] = isoDateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// 'YYYY-MM-DD' 형식을 'YYYY.MM.DD' 형식으로 포맷
export const fromBackendDate = (isoDate: string | null): string => {
  if (!isoDate || !isRealDate(isoDate)) return '';
  const parts = isoDate.split('-');
  return `${parts[0]}.${parts[1]}.${parts[2]}`;
};
