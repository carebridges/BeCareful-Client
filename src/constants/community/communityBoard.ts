import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { ReactComponent as Information } from '@/assets/icons/community/Information.svg';
// import { ReactComponent as Participation } from '@/assets/icons/community/Participation.svg';
import { Boards } from '@/types/Community/community';

export const COMMUNITY_BOARDS_TAB = [
  '전체',
  '협회 공지',
  '공단 공지',
  '정보 공유',
];

export const COMMUNITY_BOARDS_LIST = ['협회 공지', '공단 공지', '정보 공유'];

// parameter로 사용할 boardType
export const BOARD_KR_TO_EN: { [key: string]: string } = {
  '협회 공지': 'association-notice',
  '공단 공지': 'service-notice',
  '정보 공유': 'information-sharing',
};

export const BOARD_EN_TO_PARAM: { [key: string]: string } = {
  ASSOCIATION_NOTICE: 'association',
  SERVICE_NOTICE: 'service',
  INFORMATION_SHARING: 'information',
};

export const BOARD_PARAM_TO_EN: { [key: string]: string } = {
  association: 'association-notice',
  service: 'service-notice',
  information: 'information-sharing',
};

export const BOARD_PARAM_TO_KR: { [key: string]: string } = {
  association: '협회 공지',
  service: '공단 공지',
  information: '정보 공유',
};

export const BOARD_KR_TO_PARAM: { [key: string]: string } = {
  '협회 공지': 'association',
  '공단 공지': 'service',
  '정보 공유': 'information',
};

// 게시판 리스트 : CommunityHome에서 사용
export const BOARD_LIST: Boards[] = [
  {
    label: '협회 공지',
    api: BOARD_KR_TO_EN['협회 공지'],
    icon: NoticeIcon,
  },
  {
    label: '공단 공지',
    api: BOARD_KR_TO_EN['공단 공지'],
    icon: NoticeIcon,
  },
  {
    label: '정보 공유',
    api: BOARD_KR_TO_EN['정보 공유'],
    icon: Information,
  },
];
