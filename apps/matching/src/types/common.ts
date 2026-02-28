// ==================== 공고/매칭 관련 ====================
export type MatchingResultStatus = '높음' | '보통' | '낮음';
export type RecruitmentStatus = '모집중' | '모집완료' | '조율중' | '공고마감';

export interface MatchingCareTypeOption {
  key: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// ==================== 공통 근무 타입 ====================
export type CareLevel =
  | '1등급'
  | '2등급'
  | '3등급'
  | '4등급'
  | '5등급'
  | '인지지원등급'
  | '등급없음';

export interface CareType {
  careType: string;
  detailCareTypes: string[];
}

export type WorkTime = 'MORNING' | 'AFTERNOON' | 'EVENING';

export type WorkSalaryUnitType = 'HOUR' | 'DAY' | 'MONTH' | 'YEAR';
export type WorkSalaryUnitTypeKR = '시급' | '일급' | '월급' | '연봉';

export type WorkDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface WorkLocation {
  siDo: string;
  siGuGun: string;
  eupMyeonDong: string;
}

// ==================== 지역 데이터 ====================
export interface AreaSelectData {
  name: string;
  gu: {
    name: string;
    dong: string[];
  }[];
}

export interface Address {
  streetAddress: string;
  detailAddress: string;
}
