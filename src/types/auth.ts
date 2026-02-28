import { CertificateInfo } from '@/types/caregiver';
import { Gender, InstitutionRank, Rank } from '@/types/common';

// ==================== 사회복지사 ====================
export interface SocialSignUpFormData {
  name: string;
  birthDate: string;
  gender: Gender;
  phoneNumber: string;
  password: string;
  institutionId: string;
  rank: Rank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
} // TODO
