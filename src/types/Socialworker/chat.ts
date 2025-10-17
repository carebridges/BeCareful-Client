import { WorkDay, WorkSalaryUnitType } from '@/types/Caregiver/common';
import { ChatResponse, CaregiverInfo } from '@/types/Common/chat';
import { ElderlyDetail } from '@/types/Socialworker/common';

export interface SocialworkerContractEditRequest {
  matchingId: number;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
  careTypes: string[];
}

export interface SocialworkerChatList {
  matchingId: number;
  recruitmentId: number;
  caregiverInfo: CaregiverInfo;
  recentChat: string;
  time: string;
  elderlyInfo: ElderlyDetail;
}

export type SocialworkerChatListResponse = SocialworkerChatList[];

export type SocialworkerChatResponse = ChatResponse;

interface CareInfoList {
  careType: string;
  detailCareTypes: string[];
  check: boolean;
}

export interface SocialworkerContractResponse {
  matchingId: number;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
  careInfoList: CareInfoList[];
}
