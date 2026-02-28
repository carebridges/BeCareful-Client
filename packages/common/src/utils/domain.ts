import { CareTypeKey } from '../types/common';

// 리스트 "외 N건" 포맷팅
export const formatWithEtc = (list: string[], length: number) => {
  if (list.length <= length) return list.join(', ');
  return `${list.slice(0, length).join(', ')} 외 ${list.length - length}`;
};

// 케어타입
export const formatCaretype = (
  caretypes: string[] | CareTypeKey[],
  length: number,
) => {
  const caretypeStrings = caretypes.map(String);
  return formatWithEtc(caretypeStrings, length);
};
