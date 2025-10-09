import { DAY_EN_TO_KR, DAY_KR_TO_EN } from '@/constants/common/day';
import { MEDIATION_KR_TO_EN } from '@/constants/common/mediation';
import { TIME_EN_TO_KR, TIME_KR_TO_EN } from '@/constants/common/time';
import { CareType, WorkLocation } from '@/types/Caregiver/common';

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
    return `${caretypes.slice(0, length).join(', ')} 외 ${count}개`;
  }
};

// workday
export const formatDaysToKR = (days: string[]) => {
  return days.map((day) => DAY_EN_TO_KR[day]).join(', ');
};

export const formatDaysToEN = (days: string[]) => {
  return days.map((day) => DAY_KR_TO_EN[day]);
};

// worktime
export const formatTimeToKR = (times: string[]) => {
  return times.map((time) => TIME_EN_TO_KR[time]).join(', ');
};

export const formatTimeToEN = (times: string[]) => {
  return times.map((time) => TIME_KR_TO_EN[time]);
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
    return locations.join(',');
  } else {
    const count = locations.length - length;
    return `${locations.slice(0, length).join(', ')} 외 ${count}개`;
  }
};

// mediation type
export const formatMediationTypeToEN = (mediationTypes: string[]) => {
  return mediationTypes.map(
    (mediationType) => MEDIATION_KR_TO_EN[mediationType],
  );
};
