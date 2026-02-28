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
