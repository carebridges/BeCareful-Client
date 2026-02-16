import { DAY_MAP, MEDIATION_MAP, TIME_MAP } from '@/constants/common/maps';
import {
  CareType,
  WorkDay,
  WorkLocation,
  WorkTime,
} from '@/types/Caregiver/common';

/* 요양보호사 관련 format 함수들 */
// caretype
export const formatCaretype = (
  caretypes: string[] | CareType[],
  length: number,
) => {
  if (caretypes.length <= length) {
    return caretypes.join(', ');
  } else {
    const count = caretypes.length - length;
    return `${caretypes.slice(0, length).join(', ')} 외 ${count}`;
  }
};

// workday
export const formatDaysToKR = (days: WorkDay[]) => {
  return days.map((day) => DAY_MAP.EN_TO_KR[day]).join(', ');
};

export const formatDaysToEN = (days: string[]) => {
  return days.map((day) => DAY_MAP.KR_TO_EN[day]);
};

// worktime
export const formatTimeToKR = (times: WorkTime[]) => {
  return times.map((time) => TIME_MAP.EN_TO_KR[time]).join(', ');
};

export const formatTimeToEN = (times: string[]) => {
  return times.map((time) => TIME_MAP.KR_TO_EN[time]);
};

// location
export const formatLocation = (
  workLocations: WorkLocation[],
  length: number,
) => {
  const locations = workLocations.map((location) =>
    location.eupMyeonDong === '전체'
      ? `${location.siGuGun} ${location.eupMyeonDong}`
      : `${location.eupMyeonDong}`,
  );

  if (workLocations.length <= length) {
    return locations.join(', ');
  } else {
    const count = locations.length - length;
    return `${locations.slice(0, length).join(', ')} 외 ${count}`;
  }
};

// mediation type
export const formatMediationTypeToEN = (mediationTypes: string[]) => {
  return mediationTypes.map(
    (mediationType) => MEDIATION_MAP.KR_TO_EN[mediationType],
  );
};
