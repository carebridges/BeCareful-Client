import { CareLevel, CareType, WorkLocation } from '@/types/common';
import { RecruitmentItem } from '@/types/matching';
import { CareTypeKey, Gender } from '@repo/common';

export type ResidentialLocation = Pick<
  WorkLocation,
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
  detailCareTypeList: CareTypeKey[];
}

export interface ElderlyBase {
  elderlyId: number;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: Gender;
  elderlyLocation: string;
  elderlyCareLevel: string;
  elderlyProfileImageUrl: string;
}

export interface ElderListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: ElderlyBase[];
}

export interface ElderlyDetailInfo {
  name: string;
  gender: Gender;
  birthDate: string;
  age: number;
  address: string;
  profileImageUrl: string;
  careLevel: string;
  detailCareTypes: CareType[];
  healthCondition: string;
  institutionName: string;
  hasInmate: boolean;
  hasPet: boolean;
}

export interface ElderDetailResponse {
  elderlyInfo: ElderlyDetailInfo;
  recruitments: RecruitmentItem[];
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

export interface ElderDataTemp {
  elderlyId: number;
  name: string;
  age: number;
  gender: Gender;
  careLevel: string;
  caregiverNum?: number;
  isMatching?: boolean;
  profileImageUrl?: string;
  cognitiveLevel?: string;
}
