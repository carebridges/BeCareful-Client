import { ElderlyDetail, SocialWorkerInfo } from '@/types/Socialworker/common';
import { InstitutionInfo } from '@/types/Common/institutionInfo';

export interface SocialHomeInstitutionInfo {
  institutionDetail: InstitutionInfo;
  elderlyCount: number;
  socialWorkerCount: number;
  socialWorkerList: SocialWorkerInfo[];
}

export interface RecruitmentStatistics {
  recruitmentProcessingCount: number;
  recentlyCompletedCount: number;
  totalRecruitmentCompletedCount: number;
}

export interface MatchingElderlyList {
  elderlyDetail: ElderlyDetail;
  recruitmentCount: number;
}

export interface SocialworkerHomeResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: SocialHomeInstitutionInfo;
  recruitmentStatistics: RecruitmentStatistics;
  matchingProcessingElderlys: MatchingElderlyList[];
  hasNewChat: boolean;
}
