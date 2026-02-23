export type FacilityType =
  | '방문 요양'
  | '방문 목욕'
  | '방문 간호'
  | '주야간 보호'
  | '단기 보호'
  | '복지 용구';

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

export interface Institution {
  institutionId: number;
  institutionName: string;
  institutionStreetAddress: string;
  institutionDetailAddress: string;
}

export interface InstitutionInfo {
  institutionId: number;
  institutionCode: string;
  name: string;
  profileImageUrl: string;
  address: string;
}

export interface SocialworkerInstitutionInfo {
  institutionCode: string;
  institutionName: string;
  institutionImageUrl: string;
  institutionLastUpdate: string;
  institutionOpenYear: number;
  facilityTypes: string[];
  institutionPhoneNumber: string;
}

export interface InstitutionUpdateRequest {
  institutionName: string;
  institutionCode: string;
  openYear: number;
  facilityTypeList: string[];
  phoneNumber: string;
  profileImageTempKey: string | null;
}
