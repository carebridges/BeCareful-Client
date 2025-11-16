import { colors } from '@/style/theme/color';

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
