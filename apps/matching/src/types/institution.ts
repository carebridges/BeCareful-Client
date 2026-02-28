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
