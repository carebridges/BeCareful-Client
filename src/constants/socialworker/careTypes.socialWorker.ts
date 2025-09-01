import { CareType } from '@/types/Elderly';
import { MatchingCareTypeOption } from '@/types/Matching.socialWorker';

export const CARE_TYPES = [
  '식사보조',
  '이동보조',
  '배변보조',
  '일상생활',
  '질병보조',
] as const;

export const CARE_TYPE_DETAILS: Record<CareType, string[]> = {
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
  질병보조: ['병원 동행', '복약지도', '인지치료', '재활프로그램'],
};

export const MATCHING_CARE_TYPE_OPTIONS: MatchingCareTypeOption[] = [
  {
    key: '식사보조',
    title: '식사보조',
    description: '스스로 식사가능, 경관식 보조',
  },
  {
    key: '배변보조',
    title: '배변보조',
    description: '가끔 대소변 실수 시 도움, 기저귀 케어 필요',
  },
  {
    key: '일상생활',
    title: '일상생활',
    description: '청소, 빨래보조',
  },
];
