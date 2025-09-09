import { WorkDay, ElderlyInfo } from '@/types/Caregiver/common';

/* 요양보호사 홈 화면 */
export interface WorkSchedule {
  workStartTime: string;
  workEndTime: string;
  seniorName: string;
  seniorGender: 'MALE' | 'FEMALE';
  seniorAge: number;
  seniorCareType: string[];
  workLocation: string;
}

// 요양 보호사 홈 화면 데이터 조회 응답
export interface CaregiverHomeResponse {
  name: string;
  hasNewChat: boolean;
  applicationCount: number;
  recruitmentCount: number;
  workScheduleList: WorkSchedule[];
  isWorking: boolean;
  isApplying: boolean;
}

/* 요양보호사 나의 일자리 */
export interface CaregiverCompletedMatching {
  id: number;
  workDays: WorkDay[];
  careTypes: string[];
  note: string;
  elderlyInfo: ElderlyInfo;
}

// 요양보호사 확정된 일자리 리스트 조회 응답
export type CaregiverCompletedMatchingResponse = CaregiverCompletedMatching[];

// 메모 수정 요청
export interface MemoEditRequest {
  note: string;
}
