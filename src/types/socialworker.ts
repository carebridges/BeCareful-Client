import { BaseUserInfo, CommunityAgreement } from '@/types/user';
import { AssociationRank, InstitutionRank } from '@/types/common';
import { ElderlyBase } from '@/types/elderly';
import {
  InstitutionInfo,
  SocialworkerInstitutionInfo,
} from '@/types/institution';
import { AssociationBase } from '@/types/association';

export interface SocialWorkerInfo extends BaseUserInfo {
  nickName: string;
  institutionRank: InstitutionRank;
  associationRank: AssociationRank;
}

// ==================== 홈 ====================
export interface RecruitmentStatistics {
  recruitmentProcessingCount: number;
  recentlyCompletedCount: number;
  totalRecruitmentCompletedCount: number;
}

export interface MatchingElderlyList {
  elderlyDetail: ElderlyBase;
  recruitmentCount: number;
}

export interface SocialHomeInstitutionInfo {
  institutionDetail: InstitutionInfo;
  elderlyCount: number;
  socialWorkerCount: number;
  socialWorkerList: SocialWorkerInfo[];
}

export interface SocialworkerHomeResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: SocialHomeInstitutionInfo;
  recruitmentStatistics: RecruitmentStatistics;
  matchingProcessingElderlys: MatchingElderlyList[];
}

// ==================== 마이페이지 ====================
export interface SocialworkerProfileResponse {
  socialWorkerInfo: SocialWorkerInfo;
  institutionInfo: SocialworkerInstitutionInfo;
  associationInfo: AssociationBase;
}

export interface SocialworkerUpdateResponse {
  name: string;
  nickName: string;
  birthday: string;
  genderCode: number;
  phoneNumber: string;
  profileImageUrl: string;
  institutionInfo: InstitutionInfo;
  institutionRank: InstitutionRank;
}

export interface SocialworkerUpdateRequest {
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  nursingInstitutionId: number;
  institutionRank: InstitutionRank;
  profileImageTempKey: string | null;
}

export interface SocialworkerAssociationResponse {
  memberId: number;
  name: string;
  phoneNumber: string;
  associationRank: AssociationRank;
  institutionName: string;
  institutionRank: InstitutionRank;
  institutionImageUrl: string;
  communityAgreement: CommunityAgreement;
  associationInfo: AssociationBase;
}

export type SocialWorkerProfileViewResponse = {
  socialWorkerId: number;
  socialWorkerName: string;
  socialWorkerProfileImage: string;
  socialWorkerSignUpDate: string;
  institutionInfo: {
    institutionId: number;
    institutionCode: string;
    name: string;
    profileImageUrl: string;
    address: string;
  };
};
