export interface Certificate {
  grade?: 'FIRST' | 'SECOND';
  certificateNumber: string;
}

export interface CaregiverSignUpFormData {
  realName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  streetAddress: string;
  detailAddress: string;
  caregiverCertificate: Certificate;
  socialWorkerCertificate: Certificate;
  nursingCareCertificate: Certificate;
  isHavingCar: boolean;
  isCompleteDementiaEducation: boolean;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
  profileImageUrl: string;
}

export type CertificateKey =
  | 'caregiverCertificate'
  | 'nursingCareCertificate'
  | 'socialWorkerCertificate';

export type CertificateFormInput = {
  certificateType: string;
  certificateLevel?: string;
  certificateNumber: string;
};
