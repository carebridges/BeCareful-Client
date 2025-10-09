import { SocialWorkerInfo } from '@/types/Socialworker/common';

export interface InstitutionDetail {
  institutionId: 0;
  institutionCode: string;
  name: string;
  profileImageUrl: string;
  address: string;
}

export interface InstitutionInfo {
  institutionDetail: InstitutionDetail;
  elderlyCount: number;
  socialWorkerCount: number;
  socialWorkerList: SocialWorkerInfo[];
}

export interface RecruitmentStatistics {
  recruitmentProcessingCount: number;
  recentlyCompletedCount: number;
  totalRecruitmentCompletedCount: number;
}

export interface ElderlyDetail {
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  elderlyProfileImageUrl: string;
}

export interface MatchingElderlyList {
  elderlyDetail: ElderlyDetail;
  recruitmentCount: number;
}

export interface SocialworkerHomeResponse {
  socialWorkerInfo: SocialWorkerInfo;
  hasNewChat: boolean;
  institutionInfo: InstitutionInfo;
  recruitmentStatistics: RecruitmentStatistics;
  matchingProcessingElderlys: MatchingElderlyList[];
}
