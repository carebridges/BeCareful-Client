import { MediaItem } from '@/types/Community/common';
import { PostDetailResponse, PostListItem } from '@/types/Community/post';

import p11 from '@/assets/icons/ad/1_1P.png';
import p12 from '@/assets/icons/ad/1_2P.png';
import p13 from '@/assets/icons/ad/1_3P.png';
import p14 from '@/assets/icons/ad/1_4P.png';
import p15 from '@/assets/icons/ad/1_5P.png';
import p16 from '@/assets/icons/ad/1_6P.png';
import p17 from '@/assets/icons/ad/1_7P.png';
import p18 from '@/assets/icons/ad/1_8P.png';
import p19 from '@/assets/icons/ad/1_9P.png';
import p110 from '@/assets/icons/ad/1_10P.png';

import p21 from '@/assets/icons/ad/001.png';
import p22 from '@/assets/icons/ad/002.png';
import p23 from '@/assets/icons/ad/003.png';
import p24 from '@/assets/icons/ad/004.png';
import p25 from '@/assets/icons/ad/001.png';
import p26 from '@/assets/icons/ad/001.png';
import p27 from '@/assets/icons/ad/001.png';
import p28 from '@/assets/icons/ad/001.png';
import p29 from '@/assets/icons/ad/001.png';
import p210 from '@/assets/icons/ad/001.png';
import p211 from '@/assets/icons/ad/001.png';

import p31 from '@/assets/icons/ad/5_1P.png';
import p32 from '@/assets/icons/ad/5_2P.png';
import p33 from '@/assets/icons/ad/5_3P.png';
import p34 from '@/assets/icons/ad/5_4P.png';
import p35 from '@/assets/icons/ad/5_5P.png';
import p36 from '@/assets/icons/ad/5_6P.png';
import p37 from '@/assets/icons/ad/5_7P.png';

import p41 from '@/assets/icons/ad/3_1P.png';
import p42 from '@/assets/icons/ad/3_2P.png';
import p43 from '@/assets/icons/ad/3_3P.png';
import p44 from '@/assets/icons/ad/3_4P.png';
import p45 from '@/assets/icons/ad/3_5P.png';
import p46 from '@/assets/icons/ad/3_6P.png';

const institutionImageUrl =
  'https://blogpfthumb-phinf.pstatic.net/MjAyNTA3MDhfMjcz/MDAxNzUxOTczNDcyODgx.brctvP0fPUbevkRNesf0vhhPTnWasmznRzWudVOhuhkg.G0fzmgC8RSDfFMyK61Ki0wMP0Be648rUVZYEwm2-F38g.PNG/112.png/112.png?type=w161';

export const adPostList: PostListItem[] = [
  {
    postId: 1,
    title:
      '스마트장기요양 앱 설정하는 방법, 이것만 알아두면 업무 효율 2배 상승',
    boardType: 'information-sharing',
    isImportant: false,
    thumbnailUrl: p11,
    createdAt: '2025-07-17T01:52:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
  },

  {
    postId: 2,
    title: '[스마트 장기요양 앱] 상태변화기록지 작성법',
    boardType: 'information-sharing',
    isImportant: false,
    thumbnailUrl: p21,
    createdAt: '2025-07-17T01:52:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
  },

  {
    postId: 3,
    title: '[스마트장기요양 앱] 태그부착 완전정복!',
    boardType: 'information-sharing',
    isImportant: false,
    thumbnailUrl: '',
    createdAt: '2025-07-16T00:00:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
  },

  {
    postId: 4,
    title: '[스마트 장기요양 앱-기초편4] 5등급 인지지원 어르신 요양 완전 정복',
    boardType: 'information-sharing',
    isImportant: false,
    thumbnailUrl: '',
    createdAt: '2025-07-28T03:20:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
  },
];

export const post1media: MediaItem[] = [
  { id: 1, fileName: '1', mediaUrl: p11, fileType: 'IMAGE', fileSize: 1 },
  { id: 2, fileName: '2', mediaUrl: p12, fileType: 'IMAGE', fileSize: 1 },
  { id: 3, fileName: '3', mediaUrl: p13, fileType: 'IMAGE', fileSize: 1 },
  { id: 4, fileName: '4', mediaUrl: p14, fileType: 'IMAGE', fileSize: 1 },
  { id: 5, fileName: '5', mediaUrl: p15, fileType: 'IMAGE', fileSize: 1 },
  { id: 6, fileName: '6', mediaUrl: p16, fileType: 'IMAGE', fileSize: 1 },
  { id: 7, fileName: '7', mediaUrl: p17, fileType: 'IMAGE', fileSize: 1 },
  { id: 8, fileName: '8', mediaUrl: p18, fileType: 'IMAGE', fileSize: 1 },
  { id: 9, fileName: '9', mediaUrl: p19, fileType: 'IMAGE', fileSize: 1 },
  { id: 10, fileName: '10', mediaUrl: p110, fileType: 'IMAGE', fileSize: 1 },
];

export const post2media: MediaItem[] = [
  { id: 1, fileName: '1', mediaUrl: p21, fileType: 'IMAGE', fileSize: 1 },
  { id: 2, fileName: '2', mediaUrl: p22, fileType: 'IMAGE', fileSize: 1 },
  { id: 3, fileName: '3', mediaUrl: p23, fileType: 'IMAGE', fileSize: 1 },
  { id: 4, fileName: '4', mediaUrl: p24, fileType: 'IMAGE', fileSize: 1 },
  { id: 5, fileName: '5', mediaUrl: p25, fileType: 'IMAGE', fileSize: 1 },
  { id: 6, fileName: '6', mediaUrl: p26, fileType: 'IMAGE', fileSize: 1 },
  { id: 7, fileName: '7', mediaUrl: p27, fileType: 'IMAGE', fileSize: 1 },
  { id: 8, fileName: '8', mediaUrl: p28, fileType: 'IMAGE', fileSize: 1 },
  { id: 9, fileName: '9', mediaUrl: p29, fileType: 'IMAGE', fileSize: 1 },
  { id: 10, fileName: '10', mediaUrl: p210, fileType: 'IMAGE', fileSize: 1 },
  { id: 11, fileName: '11', mediaUrl: p211, fileType: 'IMAGE', fileSize: 1 },
];

export const post3media: MediaItem[] = [
  { id: 1, fileName: '1', mediaUrl: p31, fileType: 'IMAGE', fileSize: 1 },
  { id: 2, fileName: '2', mediaUrl: p32, fileType: 'IMAGE', fileSize: 1 },
  { id: 3, fileName: '3', mediaUrl: p33, fileType: 'IMAGE', fileSize: 1 },
  { id: 4, fileName: '4', mediaUrl: p34, fileType: 'IMAGE', fileSize: 1 },
  { id: 5, fileName: '5', mediaUrl: p35, fileType: 'IMAGE', fileSize: 1 },
  { id: 6, fileName: '6', mediaUrl: p36, fileType: 'IMAGE', fileSize: 1 },
  { id: 7, fileName: '7', mediaUrl: p37, fileType: 'IMAGE', fileSize: 1 },
];

export const post4media: MediaItem[] = [
  { id: 1, fileName: '1', mediaUrl: p41, fileType: 'IMAGE', fileSize: 1 },
  { id: 2, fileName: '2', mediaUrl: p42, fileType: 'IMAGE', fileSize: 1 },
  { id: 3, fileName: '3', mediaUrl: p43, fileType: 'IMAGE', fileSize: 1 },
  { id: 4, fileName: '4', mediaUrl: p44, fileType: 'IMAGE', fileSize: 1 },
  { id: 5, fileName: '5', mediaUrl: p45, fileType: 'IMAGE', fileSize: 1 },
  { id: 6, fileName: '6', mediaUrl: p46, fileType: 'IMAGE', fileSize: 1 },
];

export const adDetail: PostDetailResponse[] = [
  {
    postId: 1,
    title:
      '스마트장기요양 앱 설정하는 방법, 이것만 알아두면 업무 효율 2배 상승',
    content:
      '혹시 스마트장기요양 앱을 처음 설정하는 데 어려움을 겪고 계시지는 않으신가요?\n\n처음 사용하는 요양보호사 선생님들을 위해 준비된 카드뉴스 가이드는 스마트장기요양 앱 설치부터 로그인 유지 설정까지, 모든 과정을 담고 있습니다.\n\n설치가 막막하게 느껴지셨다면, 이 콘텐츠 하나로 건강보험인증서, 공동인증서, 금융인증서 중 어떤 방식이든 차근차근 따라 해보세요.\n`자주 헷갈리는 생체인증과 간편비밀번호 설정까지 한눈에 정리했습니다!\n\n✅ 이런 분들께 추천드려요!\n신규 입사 요양보호사 선생님\n앱 사용에 어려움을 겪는 사회복지사\n센터 교육용 자료가 필요한 분들\n스마트폰에 익숙하지 않은 가족을 돕고 싶은 분\n\n아래 4단계로 정리한 순서만 따르면 설치부터 인증, 로그인 유지까지 10분 내 설정이 가능합니다.\n\n오늘 포스팅에서는 스마트장기요양 앱 설정하는 방법에 대해 자세히 알려드리겠습니다!',
    isImportant: false,
    isEdited: false,
    postedDate: '2025-07-17T01:52:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
    imageList: post1media,
    videoList: [],
    fileUList: [],
    isMyPost: false,
    originalUrl: 'https://blog.naver.com/carebridges',
  },

  {
    postId: 2,
    title: '[스마트 장기요양 앱] 상태변화기록지 작성법',
    content:
      '요양보호사 선생님을 위한 스마트장기요양앱으로 상태변화기록지를 작성하는 방법\n상태변화기록지는 수급자의 건강 상태, 인지 능력, 일상생활 변화 등을 정기적으로 기록해 장기요양 서비스의 품질을 높이는 중요한 문서입니다.\n\n예전에는 수기로 작성해야 했던 이 기록을,\n이제는 스마트장기요양앱을 통해 더욱 쉽고 정확하게 등록하실 수 있습니다.\n\n✅ 이런 분들께 추천드립니다!\n상태변화기록지 작성이 처음이신 요양보호사 선생님\n스마트장기요양앱으로 업무처리에 도움을 받고 싶으신 분들\n센터 내 교육자료로 활용하고 싶으신 센터장님\n기록 누락 없이 꼼꼼한 요양서비스를 실천하고자 하시는 분들\n\n작성을 마친 후에는 체크리스트를 통해 빠짐없이 기재되었는지 꼭 한 번 더 확인하세요!',
    isImportant: false,
    isEdited: false,
    postedDate: '2025-07-17T01:52:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
    imageList: post2media,
    videoList: [],
    fileUList: [],
    isMyPost: false,
    originalUrl: 'https://blog.naver.com/carebridges/223936799191',
  },

  {
    postId: 3,
    title: '[스마트장기요양 앱] 태그부착 완전정복!',
    content:
      '요양보호사 선생님을 위한 태그 부착 과정 단계별 정리\n스마트장기요양 앱의 태그부착 업무가 처음이신가요?\n\n익숙하지 않은 화면과 절차 때문에 막막하게 느껴지셨을 선생님들을 위해,\n태그부착 과정을 단계별로 정리한 카드뉴스 가이드를 준비했습니다.\n\n“태그부착 메뉴는 어디에서 찾을 수 있나요?”\n“태그 스캔이 안 될 때는 어떻게 하나요?”\n“사진은 어느 정도 거리에서 촬영해야 하나요?”\n“사진을 잘못 찍었을 때 다시 촬영할 수 있나요?”\n\n이러한 궁금증을 갖고 계시다면,\n이번 카드뉴스를 참고해보세요.\n\n✅ 이런 분들께 추천드립니다\n신규 입사하신 요양보호사 선생님\n태그부착 절차가 헷갈리시는 분\n센터 내 교육자료로 활용하실 분들\n태그 관리 업무가 처음이신 센터장님\n\n모든 과정을 마치신 후에는 마지막에 정리된\n체크리스트를 통해 다시 한 번 꼼꼼히 확인하세요!',
    isImportant: false,
    isEdited: false,
    postedDate: '2025-07-16T00:00:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
    imageList: post3media,
    videoList: [],
    fileUList: [],
    isMyPost: false,
    originalUrl: 'https://blog.naver.com/carebridges/223935337598',
  },

  {
    postId: 4,
    title: '[스마트 장기요양 앱-기초편4] 5등급 인지지원 어르신 요양 완전 정복',
    content:
      '5등급 어르신 돌봄, 어떻게 시작해야 할지 막막하셨나요?\n인지지원 등급의 기준과 시간 배분, 그리고 꼭 알아야 할 요양 가이드를 한눈에 정리했습니다.\n\n60분과 90분 서비스, 무엇이 다른지 가족요양 시 어떤 기준으로 시간배분을 해야 하는지 헷갈리셨다면 이 글을 꼭 참고해주세요.\n\n가장 실무적인 기준으로 정리된〈5등급 인지지원 필수가이드〉, 지금 바로 확인하세요.\n\n✅ 이런 분들께 추천드립니다!\n5등급 인지지원 등급 어르신을 돌보고 계신 보호자\n가족요양과 일반요양의 차이를 정확히 알고 싶은 분\n인지훈련과 일상생활 지원의 시간 기준이 헷갈리셨던 요양보호사\n요양 서비스 제공 전, 서비스 구성 기준을 미리 알고 싶은 센터장님\n치매 초기 어르신의 돌봄 방향을 고민 중인 가족',
    isImportant: false,
    isEdited: false,
    postedDate: '2025-07-28T03:20:45.072466',
    author: {
      authorId: 1,
      authorName: '돌봄다리 매니저',
      authorInstitutionRank: 'SOCIAL_WORKER',
      institutionImageUrl: institutionImageUrl,
    },
    imageList: post4media,
    videoList: [],
    fileUList: [],
    isMyPost: false,
    originalUrl: 'https://blog.naver.com/carebridges/223949203527',
  },
];
