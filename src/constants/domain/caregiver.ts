import { colors } from '@/style/theme/color';
import { CertificateKey } from '@/types/caregiver';

export const CAREGIVER_WORK_FILTERS = [
  { icon: '', name: '전체' },
  { icon: '🔥', name: '모집중' },
  { icon: '✅', name: '시간일치' },
] as const;

export const CERTIFICATE_LABEL: Record<CertificateKey, string> = {
  caregiverCertificate: '요양보호사',
  nursingCareCertificate: '간호지원사',
  socialWorkerCertificate: '사회복지사',
};

export const APPLY_TABS = ['검토중', '합격', '마감'];

type ColorKey = keyof typeof colors;
interface MatchingStatusConfig {
  stateColor: ColorKey;
  bgColor: ColorKey;
  stateLabel: string;
}

export const MATCHING_STATUS: { [key: string]: MatchingStatusConfig } = {
  검토중: {
    stateColor: 'mainBlue',
    bgColor: 'subBlue',
    stateLabel: '검토중',
  },
  합격: {
    stateColor: 'mainGreen',
    bgColor: 'subGreen',
    stateLabel: '합격',
  },
  마감: {
    stateColor: 'gray500',
    bgColor: 'gray50',
    stateLabel: '마감',
  },
};
