import {
  CertificateFormInput,
  CertificateInfo,
  CertificateKey,
} from '@repo/common';
import {
  CareGiverQualificationCard,
  NewCaregiverQualificationCard,
  NewNursingQualificationCard,
  NewSocialQualificationCard,
  NursingQualificationCard,
  SocialQualificationCard,
} from '@repo/ui';

export const CERTIFICATE_CARD_MAP: Record<
  CertificateKey,
  React.ComponentType<{
    initialType: string;
    onChange: (data: CertificateFormInput) => void;
  }>
> = {
  caregiverCertificate: CareGiverQualificationCard,
  nursingCareCertificate: NursingQualificationCard,
  socialWorkerCertificate: SocialQualificationCard,
};

export const CAREGIVER_CERTIFICATE_CARD_MAP: Record<
  CertificateKey,
  React.ComponentType<{
    initialType: string;
    onChange: (data: CertificateFormInput) => void;
    initialCert?: CertificateInfo;
    onDelete?: () => void;
  }>
> = {
  caregiverCertificate: NewCaregiverQualificationCard,
  nursingCareCertificate: NewNursingQualificationCard,
  socialWorkerCertificate: NewSocialQualificationCard,
};
