import { CertificateInfo, InstitutionRank } from '@repo/common';

// ==================== 사회복지사 ====================
export interface SignUpPayload {
  nursingInstitutionId: number;
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  institutionRank: InstitutionRank;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

// ==================== 요양보호사 ====================
export interface CaregiverSignUpFormData {
  realName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  streetAddress: string;
  detailAddress: string;
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate: CertificateInfo;
  nursingCareCertificate: CertificateInfo;
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
  profileImageTempKey: string;
}

export interface CommonCaregiverSignUpFormData extends CaregiverSignUpFormData {
  password: string;
}

export type CaregiverSignUpRequest = Omit<
  CaregiverSignUpFormData,
  'caregiverCertificate' | 'socialWorkerCertificate' | 'nursingCareCertificate'
> & {
  caregiverCertificate: CertificateInfo;
  socialWorkerCertificate?: CertificateInfo;
  nursingCareCertificate?: CertificateInfo;
};

export const buildCaregiverSignUpPayload = (
  fd: CaregiverSignUpFormData,
): CaregiverSignUpRequest => {
  const hasNumber = (c?: CertificateInfo) =>
    !!c &&
    typeof c.certificateNumber === 'string' &&
    c.certificateNumber.trim() !== '';

  const {
    caregiverCertificate,
    socialWorkerCertificate,
    nursingCareCertificate,
    ...rest
  } = fd;

  return {
    ...rest,
    caregiverCertificate,
    ...(hasNumber(socialWorkerCertificate) && { socialWorkerCertificate }),
    ...(hasNumber(nursingCareCertificate) && { nursingCareCertificate }),
  };
};
