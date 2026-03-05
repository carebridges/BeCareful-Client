import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { ReactComponent as Information } from '@/assets/icons/community/Information.svg';
import { Boards, CommunityAccessStatus } from '@/types/community';

// ==================== 커뮤니티 접근 권한 ====================
export const COMMUNITY_ACCESS_STATUS = [
  'ALREADY_APPROVED',
  'APPROVED',
  'REJECTED',
  'PENDING',
  'NOT_APPLIED',
] as const;

export const COMMUNITY_ACCESS_SESSION_KEYS: Partial<
  Record<CommunityAccessStatus, string>
> = {
  REJECTED: 'rejectedModalShown',
  PENDING: 'pendingModalShown',
  APPROVED: 'approvedModalShown',
};

// ==================== 커뮤니티 게시판 ====================
export const COMMUNITY_BOARDS_TAB = [
  '전체',
  '협회 공지',
  '공단 공지',
  '정보 공유',
];

export const COMMUNITY_BOARDS_LIST = ['협회 공지', '공단 공지', '정보 공유'];

export const BOARD_MAP = {
  KR_TO_EN: {
    '협회 공지': 'association-notice',
    '공단 공지': 'service-notice',
    '정보 공유': 'information-sharing',
  } as const,

  EN_TO_PARAM: {
    ASSOCIATION_NOTICE: 'association',
    SERVICE_NOTICE: 'service',
    INFORMATION_SHARING: 'information',
  } as const,

  PARAM_TO_EN: {
    association: 'association-notice',
    service: 'service-notice',
    information: 'information-sharing',
  } as const,

  PARAM_TO_KR: {
    association: '협회 공지',
    service: '공단 공지',
    information: '정보 공유',
  } as const,

  KR_TO_PARAM: {
    '협회 공지': 'association',
    '공단 공지': 'service',
    '정보 공유': 'information',
  } as const,
};

export const BOARD_LIST: Boards[] = [
  {
    label: '협회 공지',
    api: BOARD_MAP.KR_TO_EN['협회 공지'],
    icon: NoticeIcon,
  },
  {
    label: '공단 공지',
    api: BOARD_MAP.KR_TO_EN['공단 공지'],
    icon: NoticeIcon,
  },
  {
    label: '정보 공유',
    api: BOARD_MAP.KR_TO_EN['정보 공유'],
    icon: Information,
  },
];
