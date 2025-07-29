import {
  API_Day_Mapping,
  API_Mediation_Type_Mapping,
  API_Time_Mapping,
  Day_Mapping,
  Time_Mapping,
} from '@/constants/caregiverMapping';
import { WorkLocation } from '@/types/Caregiver/common';

/* 요양보호사 관련 format 함수들 */
// caretype
export const caretypeFormat = (caretypes: string[], length: number) => {
  if (caretypes.length <= length) {
    return caretypes.join(', ');
  } else {
    const count = caretypes.length - length;
    return `${caretypes.slice(0, length).join(', ')} 외 ${count}개`;
  }
};

// workday
export const dayFormat = (days: string[]) => {
  return days.map((day) => Day_Mapping[day]).join(', ');
};

export const apiDayFormat = (days: string[]) => {
  return days.map((day) => API_Day_Mapping[day]);
};

// worktime
export const timeFormat = (times: string[]) => {
  return times.map((time) => Time_Mapping[time]).join(', ');
};

export const apiTimeFormat = (times: string[]) => {
  return times.map((time) => API_Time_Mapping[time]);
};

// location
export const locationFormat = (
  workLocations: WorkLocation[],
  length: number,
) => {
  const locations = workLocations.map((location) =>
    location.dongEupMyeon === '전체'
      ? `${location.siGuGun} ${location.dongEupMyeon}`
      : `${location.dongEupMyeon}`,
  );

  if (workLocations.length <= length) {
    return locations.join(',');
  } else {
    const count = locations.length - length;
    return `${locations.slice(0, length).join(', ')} 외 ${count}개`;
  }
};

// mediation type
export const apiMediationFormat = (mediationTypes: string[]) => {
  return mediationTypes.map(
    (mediationType) => API_Mediation_Type_Mapping[mediationType],
  );
};
