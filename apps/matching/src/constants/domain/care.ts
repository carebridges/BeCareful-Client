import { ReactComponent as Toilet } from '@repo/ui/src/assets/icons/matching/IconTotilet.svg';
import { ReactComponent as Bath } from '@repo/ui/src/assets/icons/matching/IconBath.svg';
import { ReactComponent as Clean } from '@repo/ui/src/assets/icons/matching/IconClean.svg';
import { ReactComponent as Medicine } from '@repo/ui/src/assets/icons/matching/IconMedicine.svg';
import { ReactComponent as Spoon } from '@repo/ui/src/assets/icons/matching/IconSpoon.svg';
import { ReactComponent as WheelChair } from '@repo/ui/src/assets/icons/matching/IconWheelchair.svg';
import { MatchingCareTypeOption } from '@/types/common';
import { CareTypeKey } from '@repo/common';

// 케어 레벨
export const CARE_LEVELS = [
  '1등급',
  '2등급',
  '3등급',
  '4등급',
  '5등급',
  '인지지원등급',
  '등급없음',
] as const;

// 케어 타입
export const CARE_TYPES = [
  '식사보조',
  '이동보조',
  '배변보조',
  '일상생활',
  '목욕보조',
  '질병보조',
] as const;

export const CARE_TYPE_DETAILS: Record<CareTypeKey, string[]> = {
  식사보조: ['식사 차려드리기', '죽, 반찬 등 요리 필요', '경관식 보조'],
  이동보조: [
    '스스로 거동 가능',
    '이동시 부축 도움',
    '휠체어 이동 보조',
    '거동 불가',
  ],
  배변보조: [
    '스스로 배변 가능',
    '가끔 대소변 실수시 도움',
    '기저귀 케어 필요',
    '유도/도뇨/방광루/장루 관리',
  ],
  일상생활: [
    '청소, 빨래 보조',
    '목욕 보조',
    '산책, 간단한 운동',
    '말벗 등 정서지원',
    '인지자극 활동',
  ],
  목욕보조: ['가정 전신목욕', '차량 방문목욕'],
  질병보조: ['병원 동행', '복약지도', '인지치료', '재활프로그램'],
};

export const MATCHING_CARE_TYPE_OPTIONS: MatchingCareTypeOption[] = [
  { key: '식사보조', title: '식사보조', icon: Spoon },
  { key: '이동보조', title: '이동보조', icon: WheelChair },
  { key: '배변보조', title: '배변보조', icon: Toilet },
  { key: '일상생활', title: '일상생활', icon: Clean },
  { key: '목욕보조', title: '목욕보조', icon: Bath },
  { key: '질병보조', title: '질병보조', icon: Medicine },
];

// 시설 유형
export const FACILITY_TYPES = [
  '방문 요양',
  '방문 목욕',
  '방문 간호',
  '주야간 보호',
  '단기 보호',
  '복지 용구',
] as const;

// 매칭 사유
export const MATCH_REASON_KEYS = {
  LOCATION: 'workLocationMatchingResultReason',
  DAYS: 'workDaysMatchingResultReason',
  TIME: 'workTimeMatchingResultReason',
} as const;

export const MATCH_REASON_TEXT = {
  [MATCH_REASON_KEYS.LOCATION]: '근무지역이 일부 일치해요',
  [MATCH_REASON_KEYS.DAYS]: '근무요일이 모두 일치해요',
  [MATCH_REASON_KEYS.TIME]: '근무시간이 일부 일치해요',
} as const;
