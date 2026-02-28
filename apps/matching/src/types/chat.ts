import { WorkDay, WorkSalaryUnitType } from '@/types/common';
import { UserRole } from '@repo/common';

// ==================== 채팅방 상태 ====================
export type ChatRoomStatus =
  | '채팅가능'
  | '타매칭채용완료'
  | '요양보호사탈퇴'
  | '사회복지사전원탈퇴'
  | '공고마감';

export type ChatRoomContractStatus =
  | '근무조건조율중'
  | '근무조건동의'
  | '채용완료';

// ==================== 채팅 타입 ====================
export type ChatType =
  | 'TEXT'
  | 'CONTRACT'
  | 'CHATROOM_CONTRACT_STATUS_UPDATED'
  | 'CHATROOM_ACTIVE_STATUS_UPDATED';

export type ChatRequestType =
  | 'SEND_TEXT'
  | 'EDIT_CONTRACT'
  | 'CONFIRM_MATCHING'
  | 'ACCEPT_CONTRACT';

// ==================== 채팅 메시지 ====================
export interface TextChat {
  chatId: number;
  chatType: 'TEXT';
  senderType: UserRole;
  text: string;
  sentTime: string;
}

export interface ContractChat {
  chatType: 'CONTRACT';
  chatId: number;
  senderType: UserRole;
  sentTime: string;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  caregiverName: string;
  caregiverPhoneNumber: string;
  careTypes: string[];
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
}

export interface ChatRoomContractStatusUpdatedChat {
  chatType: 'CHATROOM_CONTRACT_STATUS_UPDATED';
  chatId?: number;
  status: ChatRoomContractStatus;
  sentTime?: string;
  senderType?: string;
}

export interface ChatRoomActiveStatusUpdatedChat {
  chatType: 'CHATROOM_ACTIVE_STATUS_UPDATED';
  chatId?: number;
  status: ChatRoomStatus;
  sentTime?: string;
  senderType?: string;
}

export type ChatResponse =
  | TextChat
  | ContractChat
  | ChatRoomContractStatusUpdatedChat
  | ChatRoomActiveStatusUpdatedChat;

// ==================== 채팅 요청 ====================
export interface SendTextRequest {
  sendRequestType: 'SEND_TEXT';
  text: string;
}

export interface EditContractRequest {
  sendRequestType: 'EDIT_CONTRACT';
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
  careTypes: string[];
}

export interface ConfirmContractRequest {
  sendRequestType: 'CONFIRM_MATCHING';
  lastContractChatId: number;
}

export interface AcceptContractRequest {
  sendRequestType: 'ACCEPT_CONTRACT';
  lastContractChatId: number;
}

export type ChatRequest =
  | SendTextRequest
  | EditContractRequest
  | AcceptContractRequest
  | ConfirmContractRequest;

// ==================== 새 메시지 알림 ====================
export interface NewChat {
  chatRoomId: number;
  lastChat: string;
  lastSendTime: string;
  unreadCount: number;
}

// ==================== 상태 메시지 (UI용) ====================
export interface StatusMessage {
  title: string;
  detail: string;
}

export interface OtherUserProfile {
  profileImg: string;
  name: string;
}

// ==================== 채팅방 목록 ====================
export interface ChatRoomListItem {
  chatRoomId: number;
  recentChat: string;
  lastSendTime: string;
  unreadCount: number;
}

export interface SocialworkerChatList extends ChatRoomListItem {
  caregiverId: number;
  caregiverProfileImageUrl: string;
  caregiverName: string;
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  isContractAccepted: boolean;
}

export interface CaregiverChatList extends ChatRoomListItem {
  nursingInstitutionProfileImageUrl: string;
  nursingInstitutionName: string;
}

// ==================== 채팅방 상세 ====================
export interface ChatRoomDetail {
  elderlyName: string;
  elderlyProfileImageUrl: string;
  chatRoomStatus: ChatRoomStatus;
  chatRoomContractStatus: ChatRoomContractStatus;
  recruitmentId: number;
  chatList: ChatResponse[];
}

export interface SocialworkerChatResponse extends ChatRoomDetail {
  caregiverName: string;
  caregiverProfileImageUrl: string;
  caregiverPhoneNumber: string;
}

export interface CaregiverChatResponse extends ChatRoomDetail {
  institutionName: string;
  institutionProfileImageUrl: string;
}

// ==================== 계약서 상세 ====================
interface CareInfoList {
  careType: string;
  detailCareTypes: string[];
  check: boolean;
}

export interface ContractChatDetail {
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
  careInfoList: CareInfoList[];
}
