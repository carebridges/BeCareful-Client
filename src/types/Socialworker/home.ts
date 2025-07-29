import { SocialWorkerInfo } from '@/types/Socialworker/common';

interface InstitutionInfo {
  institutionName: string;
  elderlyCount: number;
  socialWorkerCount: number;
  socialWorkerList: SocialWorkerInfo[];
}

interface MatchingStatistics {
  matchingProcessingCount: number;
  recentlyMatchedCount: number;
  totalMatchingCompletedCount: number;
}

interface ApplicationStatistics {
  appliedCaregiverCount: number;
  averageAppliedCaregiver: number;
  averageApplyingRate: number;
}

interface MatchingElderlyList {
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
