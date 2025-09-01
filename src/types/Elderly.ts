import { CARE_LEVELS } from '@/constants/socialworker/careLevels.socialWorker';
import { CARE_TYPES } from '@/constants/socialworker/careTypes.socialWorker';

export interface AreaSocial {
  siDo: string;
  siGuGun: string;
  eupMyeonDong: string;
}

export interface AreaSelectData {
  name: string;
  gu: {
    name: string;
    dong: string[];
  }[];
}

export type CareLevel = (typeof CARE_LEVELS)[number];

export type CareType = (typeof CARE_TYPES)[number];

export type Gender = 'MALE' | 'FEMALE';

export interface ElderlyRegisterPayload {
  name: string;
  birthday: string;
  inmate: boolean;
  pet: boolean;
  gender: Gender;
  careLevel: CareLevel;
  siDo: AreaSocial['siDo'];
  siGuGun: AreaSocial['siGuGun'];
  eupMyeonDong: AreaSocial['eupMyeonDong'];
  detailAddress: string;
  profileImageUrl: string;
  healthCondition: string;
  detailCareTypeList: CareType[];
}

export interface ElderlyListItem {
  elderlyId: number;
  name: string;
  age: number;
  gender: Gender;
  profileImageUrl: string;
  careLevel: string;
  caregiverNum: number;
  isMatching: boolean;
}
