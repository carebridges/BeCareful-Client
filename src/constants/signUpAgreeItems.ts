import { CENTER_TERMS, MARKETING_TERMS, PRIVACY_TERMS } from './termText';

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
