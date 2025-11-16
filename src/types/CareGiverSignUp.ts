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
  profileImageTempKey: string;
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

export type CaregiverSignUpRequest = Omit<
  CaregiverSignUpFormData,
  'caregiverCertificate' | 'socialWorkerCertificate' | 'nursingCareCertificate'
> & {
  caregiverCertificate: Certificate;
  socialWorkerCertificate?: Certificate;
  nursingCareCertificate?: Certificate;
};

const hasNumber = (c?: Certificate) =>
  !!c &&
  typeof c.certificateNumber === 'string' &&
  c.certificateNumber.trim() !== '';

export const buildCaregiverSignUpPayload = (
  fd: CaregiverSignUpFormData,
): CaregiverSignUpRequest => {
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
