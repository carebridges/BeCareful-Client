import { SocialWorkerInfo } from '@/types/Socialworker/common';

export interface InstitutionInfo {
  institutionName: string;
  elderlyCount: number;
  socialWorkerCount: number;
  socialWorkerList: SocialWorkerInfo[];
}

export interface MatchingStatistics {
  matchingProcessingCount: number;
  recentlyMatchedCount: number;
  totalMatchingCompletedCount: number;
}

export interface ApplicationStatistics {
  appliedCaregiverCount: number;
  averageAppliedCaregiver: number;
  averageApplyingRate: number;
}

export interface MatchingElderlyList {
  elderlyName: string;
  elderlyAge: number;
  elderlyGender: 'FEMALE' | 'MALE';
  elderlyProfileImageUrl: string;
}

export interface SocialworkerHomeResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: InstitutionInfo;
  matchingStatistics: MatchingStatistics;
  applicationStatistics: ApplicationStatistics;
  matchingElderlyList: MatchingElderlyList[];
}
