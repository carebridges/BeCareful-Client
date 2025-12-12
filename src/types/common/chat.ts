import { WorkDay, WorkSalaryUnitType } from '@/types/Caregiver/common';
import { ChatRoomContractStatus, ChatRoomStatus } from '@/types/Caregiver/chat';

export type UserRole = 'CAREGIVER' | 'SOCIAL_WORKER';

export interface StatusMessage {
  title: string;
  detail: string;
}

export interface OtherUserProfile {
  profileImg: string;
  name: string;
}

export type SendRequestType =
  | 'SEND_TEXT'
  | 'EDIT_CONTRACT'
  | 'CONFIRM_MATCHING'
  | 'ACCEPT_CONTRACT';

export type ChatType =
  | 'TEXT'
  | 'CONTRACT'
  | 'CHATROOM_CONTRACT_STATUS_UPDATED'
  | 'CHATROOM_ACTIVE_STATUS_UPDATED';

export interface SendTextChatRequest {
  sendRequestType: 'SEND_TEXT';
  text: string;
}

export interface EditContractChatRequest {
  sendRequestType: 'EDIT_CONTRACT';
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryUnitType: WorkSalaryUnitType;
  workSalaryAmount: number;
  workStartDate: string;
  careTypes: string[];
}

export interface ConfirmContractChatRequest {
  sendRequestType: 'CONFIRM_MATCHING';
  lastContractChatId: number;
}

export interface AcceptContractChatRequest {
  sendRequestType: 'ACCEPT_CONTRACT';
  lastContractChatId: number;
}

export interface TextChatResponse {
  chatId: number;
  chatType: 'TEXT';
  senderType: UserRole;
  text: string;
  sentTime: string;
}

export interface ContractChatResponse {
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

export interface ChatRoomContractStatusUpdatedChatResponse {
  chatType: 'CHATROOM_CONTRACT_STATUS_UPDATED';
  chatId?: number;
  status: ChatRoomContractStatus;
  sentTime?: string;
  senderType?: string;
}

export interface ChatRoomActiveStatusUpdatedChatResponse {
  chatType: 'CHATROOM_ACTIVE_STATUS_UPDATED';
  chatId?: number;
  status: ChatRoomStatus;
  sentTime?: string;
  senderType?: string;
}

export type ChatRequest =
  | SendTextChatRequest
  | EditContractChatRequest
  | AcceptContractChatRequest
  | ConfirmContractChatRequest;

export type ChatResponse =
  | TextChatResponse
  | ContractChatResponse
  | ChatRoomContractStatusUpdatedChatResponse
  | ChatRoomActiveStatusUpdatedChatResponse;
