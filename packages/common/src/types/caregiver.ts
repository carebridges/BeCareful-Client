// ==================== 자격증 ====================
export type CertificateKey =
  | 'caregiverCertificate'
  | 'nursingCareCertificate'
  | 'socialWorkerCertificate';

export type CertificateFormInput = {
  certificateType: string;
  certificateLevel?: string;
  certificateNumber: string;
};

export interface CertificateInfo {
  grade?: 'FIRST' | 'SECOND' | 'none';
  certificateNumber: string;
}
