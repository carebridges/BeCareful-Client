export interface CaregiverChatList {
  chatRoomId: number;
  nursingInstitutionProfileImageUrl: string;
  nursingInstitutionName: string;
  recentChat: string;
  lastSendTime: string;
  unreadCount: number;
}

export type CaregiverChatListResponse = CaregiverChatList[];

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

export interface CaregiverChatResponse {
  institutionName: string;
  institutionProfileImageUrl: string;
  elderlyName: string;
  elderlyProfileImageUrl: string;
  chatRoomStatus: ChatRoomStatus;
  chatRoomContractStatus: ChatRoomContractStatus;
  recruitmentId: number;
  chatList: [];
}
