import { CareGiverQualificationCard } from '@/components/common/QualificationCard/CaregiverQualificationCard';
import { NursingQualificationCard } from '@/components/common/QualificationCard/NursingQualificationCard';
import { SocialQualificationCard } from '@/components/common/QualificationCard/SocialQualificationCard';
import { CertificateFormInput, CertificateKey } from '@/types/CareGiverSignUp';
import { NewCaregiverQualificationCard } from '@/components/common/QualificationCard/NewCaregiverQualificationCard';
import { NewNursingQualificationCard } from '@/components/common/QualificationCard/NewNursingQualificationCard';
import { NewSocialQualificationCard } from '@/components/common/QualificationCard/NewSocialQualificationCard';
import { CertificateInfo } from '@/types/Caregiver/common';

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
