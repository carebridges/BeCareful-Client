import {
  COMMUNITY_CENTER_TERMS,
  COMMUNITY_MARKETING_TERMS,
  COMMUNITY_PERSONAL_TERMS,
} from './termTextCommunity';

export const COMMUNITY_AGREE_ITEMS = [
  {
    key: 'agreedToTerms',
    id: '1',
    select: '필수',
    guide: '돌봄다리 커뮤니티 이용약관',
    content: COMMUNITY_CENTER_TERMS,
  },
  {
    key: 'agreedToCollectPersonalInfo',
    id: '2',
    select: '필수',
    guide: '돌봄다리 커뮤니티 개인정보 수집 및 이용 동의',
    content: COMMUNITY_PERSONAL_TERMS,
  },
  {
    key: 'agreedToReceiveMarketingInfo',
    id: '3',
    select: '선택',
    guide: '돌봄다리 커뮤니티 마케팅 정보 수신 동의',
    content: COMMUNITY_MARKETING_TERMS,
  },
] as const;
