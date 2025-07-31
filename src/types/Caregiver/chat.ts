import { ChatResponse } from '@/types/Common/chat';

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
