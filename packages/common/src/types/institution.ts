export type FacilityType =
  | '방문 요양'
  | '방문 목욕'
  | '방문 간호'
  | '주야간 보호'
  | '단기 보호'
  | '복지 용구';

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

export interface InstitutionFormData {
  institutionName: string;
  institutionCode: string;
  openYear: number;
  facilityTypeList: string[];
  phoneNumber: string;
  streetAddress?: string;
  detailAddress?: string;
  profileImageTempKey?: string | null;
}
