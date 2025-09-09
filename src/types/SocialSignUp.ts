import { FACILITY_TYPES } from '@/constants/socialworker/institutionFacilityTypes';

export type Gender = 'MALE' | 'FEMALE' | '';

export type Rank = 'MANAGER' | 'SOCIALWORKER' | ''; //TODO

export type InstitutionRank =
  | 'CENTER_DIRECTOR'
  | 'REPRESENTATIVE'
  | 'SOCIAL_WORKER'
  | 'none';

export interface SocialSignUpFormData {
  name: string;
  birthDate: string;
  gender: Gender;
  phoneNumber: string;
  password: string;
  institutionId: string;
  rank: Rank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
} //TODO

export interface NursingInstitutionRegisterRequest {
  institutionId: string;
  institutionName: string;
  streetAddress: string;
  detailAddress: string;
  phoneNumber: string;
  openDate: string;
  isHavingBathCar: boolean;
  profileImageUrl?: string;
}

export type FacilityType = (typeof FACILITY_TYPES)[number];

export interface SearchInstitution {
  institutionId: number;
  institutionCode?: string;
  name: string;
  address?: string;
}

export interface Institution {
  institutionId: number;
  institutionName: string;
  institutionStreetAddress: string;
  institutionDetailAddress: string;
}
export interface SignUpPayload {
  nursingInstitutionId: number;
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  institutionRank: InstitutionRank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}
