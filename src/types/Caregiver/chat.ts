import { ChatResponse } from '@/types/common/chat';

export interface CaregiverChatList {
  matchingId: number;
  nursingInstitutionProfileImageUrl: string;
  nursingInstitutionName: string;
  recentChat: string;
  lastSendTime: string;
  unreadCount: number;
}

export type CaregiverChatListResponse = CaregiverChatList[];

export type CaregiverChatResponse = ChatResponse;
