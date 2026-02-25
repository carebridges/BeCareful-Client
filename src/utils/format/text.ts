// 전화번호
export const formatPhoneNumber = (value: string) => {
  value = value.replace(/[^0-9]/g, '');

  if (value.startsWith('02')) {
    if (value.length <= 2) return value;
    if (value.length <= 5) return value.replace(/(\d{2})(\d{1,3})/, '$1-$2');
    if (value.length <= 9)
      return value.replace(/(\d{2})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
    return value.substring(0, 10).replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  if (value.length <= 3) return value;
  if (value.length <= 7) return value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  if (value.length <= 11)
    return value.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
  return value.substring(0, 11).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

// 입력창 자동 마스킹 (YYYY.MM.DD)
export const formatDateInput = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  return digits.replace(/(\d{4})(\d{2})?(\d{2})?/, (_, y, m, d) =>
    [y, m, d].filter(Boolean).join('.'),
  );
};

// 생년월일 입력 제한 포맷
export const formatBirthDate = (value: string) => {
  const digits = value.replace(/\D/g, '');
  let [y, m, d] = [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6, 8)];
  const thisYear = new Date().getFullYear();
  if (y.length === 4)
    y = Math.max(1900, Math.min(thisYear, Number(y))).toString();
  if (m.length === 2)
    m = Math.max(1, Math.min(12, Number(m)))
      .toString()
      .padStart(2, '0');
  if (d.length === 2) {
    const maxDay = new Date(Number(y), Number(m), 0).getDate();
    d = Math.max(1, Math.min(maxDay, Number(d)))
      .toString()
      .padStart(2, '0');
  }
  return [y, m, d].filter(Boolean).join('-');
};

// 말줄임표
export const formatTextTruncate = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

// 성별 코드
export const getGenderCode = (char: string): number => {
  return ['1', '2', '3', '4'].includes(char) ? Number(char) : 0;
};

// 공공 api 연결 전 임시 주소
export const getRandomAddress = () => {
  const chars = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허';
  const getRandomString = (length: number) =>
    Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');
  return { street: getRandomString(5), detail: getRandomString(5) };
};
