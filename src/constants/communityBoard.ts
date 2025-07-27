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
