export const getGenderCode = (char: string): number => {
  if (char === '1') return 1;
  if (char === '2') return 2;
  if (char === '3') return 3;
  if (char === '4') return 4;

  return 0;
};
