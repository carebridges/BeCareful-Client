import { colors } from '@/style/theme/color';

export const APPLY_TABS = ['검토중', '합격', '거절'];

export const MATCHING_STATUS_KR_TO_EN: { [key: string]: string } = {
  검토중: '지원검토중',
  합격: '근무제안',
  거절: '지원거절',
};

type ColorKey = keyof typeof colors;
interface MatchingStatusConfig {
  stateColor: ColorKey;
  bgColor: ColorKey;
  stateLabel: string;
}

export const MATCHING_STATUS: { [key: string]: MatchingStatusConfig } = {
  지원검토중: {
    stateColor: 'mainBlue',
    bgColor: 'subBlue',
    stateLabel: '검토중',
  },
  근무제안: {
    stateColor: 'mainGreen',
    bgColor: 'subGreen',
    stateLabel: '합격',
  },
  지원거절: {
    stateColor: 'gray500',
    bgColor: 'gray50',
    stateLabel: '거절',
  },
};
