export const formatProfileDate = (date: string) => {
  if (!date) return '';

  const [year, month, day] = date.split('-');

  if (!year || !month || !day) {
    return `${date} 가입`;
  }

  return `${year}년 ${Number(month)}월 ${Number(day)}일 가입`;
};
