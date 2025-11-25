import { WorkDay, WorkSalaryUnitType } from '@/types/Caregiver/common';
import { ChatRoomContractStatus, ChatRoomStatus } from '../Caregiver/chat';

export interface SocialworkerChatList {
  chatRoomId: number;
  caregiverId: number;
  caregiverProfileImageUrl: string;
  caregiverName: string;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  recentChat: string;
  lastSendTime: string;
  unreadCount: number;
  isContractAccepted: boolean;
}

export type SocialworkerChatListResponse = SocialworkerChatList[];

export interface SocialworkerChatResponse {
  caregiverName: string;
  caregiverProfileImageUrl: string;
  caregiverPhoneNumber: string;
  elderlyName: string;
  elderlyProfileImageUrl: string;
  chatRoomStatus: ChatRoomStatus;
  chatRoomContractStatus: ChatRoomContractStatus;
  recruitmentId: number;
  chatList: [];
}

interface CareInfoList {
  careType: string;
  detailCareTypes: string[];
  check: boolean;
}

export interface SocialworkerContractResponse {
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
  careInfoList: CareInfoList[];
}
