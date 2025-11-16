import { CARE_LEVELS } from '@/constants/socialworker/careLevels.socialWorker';
import { CARE_TYPES } from '@/constants/socialworker/careTypes.socialWorker';
import { AreaSocial } from '@/types/common/matching';
import { RecruitmentItem } from '@/types/Socialworker/matching';

export type CareLevel = (typeof CARE_LEVELS)[number];

export type CareType = (typeof CARE_TYPES)[number];

export type Gender = 'MALE' | 'FEMALE';

export type ResidentialLocation = Pick<
  AreaSocial,
  'siDo' | 'siGuGun' | 'eupMyeonDong'
> & {};

export interface ElderlyRegisterPayload {
  name: string;
  birthday: string;
  hasInmate: boolean;
  hasPet: boolean;
  gender: Gender;
  careLevel: CareLevel;
  residentialLocation: ResidentialLocation;
  detailAddress: string;
  profileImageTempKey: string;
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

export interface ElderMatchingCardDto {
  id: number;
  name: string;
  age: number;
  gender: string;
  status: string;
  scheduleText: string;
  location: string;
  description?: string;
  autoMatchCount: number;
  applyCount: number;
  createdAtText: string;
  careTags: string[];
  careDetailMap?: Record<string, string[]>;
}

export interface ElderDetailCareType {
  careType: string;
  detailCareTypes: string[];
}

export interface ElderDetailInfo {
  name: string;
  gender: Gender;
  birthDate: string;
  age: number;
  address: string;
  profileImageUrl?: string;
  careLevel: string;
  detailCareTypes?: ElderDetailCareType[];
  healthCondition: string;
  institutionName: string;
  hasInmate: boolean;
  hasPet: boolean;
}

export interface ElderDetailResponse {
  elderlyInfo: ElderDetailInfo;
  recruitments: RecruitmentItem[];
}
