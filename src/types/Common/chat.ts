export interface Contract {
  contractId: number;
  careTypes: string[];
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  workSalaryAmount: number;
  workStartDate: string;
  createdDate: string;
}

export interface ChatElderlyInfo {
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  elderlyProfileImageUrl: string;
}

export interface ChatInstitutionInfo {
  name: string;
  address: string;
}

export interface CaregiverInfo {
  caregiverId: number;
  name: string;
  profileImageUrl: string;
}

export interface ChatResponse {
  matchingId: number;
  recruitmentId: number;
  elderlyInfo: ChatElderlyInfo;
  institutionInfo: ChatInstitutionInfo;
  caregiverInfo: CaregiverInfo;
  contractList: Contract[];
}
