import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { ReactComponent as Information } from '@/assets/icons/community/Information.svg';
// import { ReactComponent as Participation } from '@/assets/icons/community/Participation.svg';
import { Boards } from '@/types/Community/community';

export const COMMUNITY_BOARDS = [
  '전체',
  '협회 공지',
  '공단 공지',
  '정보 공유',
  // '참여 신청',
];

export const COMMUNITY_BOARDS_LIST = [
  '협회 공지',
  '공단 공지',
  '정보 공유',
  // '참여 신청',
];

// parameter로 사용할 boardType
export const Board_Type_Mapping: { [key: string]: string } = {
  '협회 공지': 'association-notice',
  '공단 공지': 'service-notice',
  '정보 공유': 'information-sharing',
  // '참여 신청': 'participation-application',
};

export const Board_Type_Param: { [key: string]: string } = {
  ASSOCIATION_NOTICE: 'association',
  SERVICE_NOTICE: 'service',
  INFORMATION_SHARING: 'information',
};

export const API_Board_Type_Param: { [key: string]: string } = {
  association: 'association-notice',
  service: 'service-notice',
  information: 'information-sharing',
};

export const Board_Type_Param_KOR: { [key: string]: string } = {
  association: '협회 공지',
  service: '공단 공지',
  information: '정보 공유',
};

export const Board_Type_Param_ENG: { [key: string]: string } = {
  '협회 공지': 'association',
  '공단 공지': 'service',
  '정보 공유': 'information',
};

// 게시판 리스트 : CommunityHome에서 사용
export const Board_List: Boards[] = [
  {
    label: '협회 공지',
    api: Board_Type_Mapping['협회 공지'],
    icon: NoticeIcon,
  },
  {
    label: '공단 공지',
    api: Board_Type_Mapping['공단 공지'],
    icon: NoticeIcon,
  },
  {
    label: '정보 공유',
    api: Board_Type_Mapping['정보 공유'],
    icon: Information,
  },
  // {
  //   label: '참여 신청',
  //   api: Board_Type_Mapping['참여 신청'],
  //   icon: Participation,
  // },
];
