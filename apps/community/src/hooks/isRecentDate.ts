// 주어진 날짜 문자열이 최근 며칠 이내인지 확인
export const isRecentDate = (dateString: string, days: number) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const daysAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return createdDate >= daysAgo;
};
