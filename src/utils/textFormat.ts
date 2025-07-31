// .. 말줄임표 format
export const textTruncateFormat = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '..';
  }
  return text;
};
