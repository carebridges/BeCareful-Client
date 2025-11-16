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

export const formatBirthDate = (value: string) => {
  const digits = value.replace(/\D/g, '');

  let year = digits.slice(0, 4);
  let month = digits.slice(4, 6);
  let day = digits.slice(6, 8);

  if (year.length === 4) {
    const y = parseInt(year, 10);
    const thisYear = new Date().getFullYear();
    if (y < 1900) year = '1900';
    if (y > thisYear) year = String(thisYear);
  }

  if (month.length === 2) {
    const m = parseInt(month, 10);
    if (m < 1) month = '01';
    if (m > 12) month = '12';
  }

  if (digits.length <= 4) return year;
  if (digits.length <= 6) return `${year}-${month}`;

  if (day.length === 2) {
    const d = parseInt(day, 10);
    const maxDay = new Date(Number(year), Number(month), 0).getDate();

    if (d < 1) day = '01';
    if (d > maxDay) day = String(maxDay).padStart(2, '0');
  }

  return `${year}-${month}-${day}`;
};
