import { Gender } from '@/types/common';

export interface BaseUserInfo {
  name: string;
  phoneNumber: string;
  gender: Gender;
  age: number;
  profileImageUrl: string;
}

// ==================== 설정 관련 ====================
export interface MarketingAgreeInfo {
  isAgreedToReceiveMarketingInfo: boolean;
}

export type AgreeField =
  | 'isAgreedToTerms'
  | 'isAgreedToCollectPersonalInfo'
  | 'isAgreedToReceiveMarketingInfo';

export type CommunityAgreeField =
  | 'agreedToTerms'
  | 'agreedToCollectPersonalInfo'
  | 'agreedToReceiveMarketingInfo';

export interface CommunityAgreement {
  agreedToTerms: boolean;
  agreedToCollectPersonalInfo: boolean;
  agreedToReceiveMarketingInfo: boolean;
}
