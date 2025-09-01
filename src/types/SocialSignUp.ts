import { FACILITY_TYPES } from '@/constants/socialworker/institutionFacilityTypes';

export type Gender = 'MALE' | 'FEMALE' | '';

export type Rank = 'MANAGER' | 'SOCIALWORKER' | ''; //TODO

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

export interface Institution {
  institutionId: number;
  institutionName: string;
  institutionStreetAddress: string;
  institutionDetailAddress: string;
}
