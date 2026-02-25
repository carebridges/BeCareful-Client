import { CENTER_TERMS, MARKETING_TERMS, PRIVACY_TERMS } from './termText';
import {
  COMMUNITY_CENTER_TERMS,
  COMMUNITY_MARKETING_TERMS,
  COMMUNITY_PERSONAL_TERMS,
} from './termTextCommunity';

export const AGREE_ITEMS = [
  {
    key: 'isAgreedToTerms',
    id: '1',
    select: '필수',
    guide: '이용약관',
    content: CENTER_TERMS,
  },
  {
    key: 'isAgreedToCollectPersonalInfo',
    id: '2',
    select: '필수',
    guide: '개인정보 수집 및 이용 동의',
    content: PRIVACY_TERMS,
  },
  {
    key: 'isAgreedToReceiveMarketingInfo',
    id: '3',
    select: '선택',
    guide: '마케팅 정보 수신 동의',
    content: MARKETING_TERMS,
  },
] as const;

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
