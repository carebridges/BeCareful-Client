import { DAY_MAP, TIME_MAP } from '@/constants/common/maps';
import { CareTypeKey, WorkDay, WorkLocation, WorkTime } from '@/types/common';

// 리스트 "외 N건" 포맷팅
export const formatWithEtc = (list: string[], length: number) => {
  if (list.length <= length) return list.join(', ');
  return `${list.slice(0, length).join(', ')} 외 ${list.length - length}`;
};

// 근무지
export const formatLocation = (
  workLocations: WorkLocation[],
  length: number,
) => {
  const locations = workLocations.map((l) =>
    l.eupMyeonDong === '전체'
      ? `${l.siGuGun} ${l.eupMyeonDong}`
      : l.eupMyeonDong,
  );
  return formatWithEtc(locations, length);
};

// 케어타입
export const formatCaretype = (
  caretypes: string[] | CareTypeKey[],
  length: number,
) => {
  const caretypeStrings = caretypes.map(String);
  return formatWithEtc(caretypeStrings, length);
};

// 근무 요일
export const translateWorkDaysToKR = (days: string[]): string => {
  return days
    .map((day) => DAY_MAP.EN_TO_KR[day as keyof typeof DAY_MAP.EN_TO_KR] || day)
    .join(', ');
};

export const sortWorkDays = (days: string[]): string[] => {
  const order = Object.keys(DAY_MAP.EN_TO_KR);
  return [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));
};

export const formatDaysToKR = (days: WorkDay[]) => {
  return days.map((day) => DAY_MAP.EN_TO_KR[day]).join(', ');
};

export const formatDaysToEN = (days: string[]) => {
  return days.map((day) => DAY_MAP.KR_TO_EN[day]);
};

// 근무 시간
export const formatTimeToKR = (times: WorkTime[]) => {
  return times.map((time) => TIME_MAP.EN_TO_KR[time]).join(', ');
};

export const formatTimeToEN = (times: string[]) => {
  return times.map((time) => TIME_MAP.KR_TO_EN[time]);
};
