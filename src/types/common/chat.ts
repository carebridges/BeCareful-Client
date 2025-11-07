import { ElderlyDetail } from '@/types/Socialworker/common';
import { InstitutionInfo } from '@/types/common/institutionInfo';

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

export interface CaregiverInfo {
  caregiverId: number;
  name: string;
  profileImageUrl: string;
}

export interface ChatResponse {
  matchingId: number;
  recruitmentId: number;
  elderlyInfo: ElderlyDetail;
  institutionInfo: InstitutionInfo;
  caregiverInfo: CaregiverInfo;
  contractList: Contract[];
}
