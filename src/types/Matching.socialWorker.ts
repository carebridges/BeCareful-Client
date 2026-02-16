import { DAY_MAP, DAYS, SALARY_MAP, TIME_MAP } from '@/constants/common/maps';
import { WorkDay } from '@/types/Caregiver/common';
import { SalaryUnit } from '@/types/common/matching';
import { Gender } from '@/types/Elderly';

export interface MatchingRecruitmentPayload {
  elderlyId: number;
  title: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  careTypes: string[];
  workSalaryType: PayCode;
  workSalaryAmount: number;
  description: string;
}

export interface Caregiver {
  profileImageUrl: string;
  caregiverId: number;
  name: string;
  resumeTitle: string;
}

export interface RawMatchingElderData {
  recruitmentInfo: {
    careType: string[];
    workDays: string[];
    workStartTime: string;
    workEndTime: string;
    elderlyInfo: {
      name: string;
      address: string;
      gender: Gender;
      age: number;
      hasInmate: boolean;
      hasPet: boolean;
      profileImageUrl: string;
      careLevel: string;
      healthCondition: string;
      institutionName: string;
      detailCareTypes: {
        careType: string;
        detailCareTypes: string[];
      }[];
    };
  };
  matchedCaregivers: RawMatchingCaregiver[];
  appliedCaregivers: RawMatchingCaregiver[];
}

export interface RawMatchingCaregiver {
  caregiverInfo: {
    caregiverInfo: {
      caregiverId: number;
      name: string;
      profileImageUrl: string;
    };
    applicationTitle: string;
  };
  matchingResultStatus: string;
}

export interface MatchingCaregiver {
  caregiverInfo: {
    caregiverId: number;
    profileImageUrl: string;
    name: string;
    applicationTitle: string;
  };
  matchingResultStatus: string;
}

export type PayLabel = keyof typeof SALARY_MAP.KR_TO_EN;
export type PayCode = keyof typeof SALARY_MAP.EN_TO_KR;

export interface MatchingCareTypeOption {
  key: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type DayLabel = (typeof DAYS)[number];

export interface CaregiverDetailData {
  matchingId: number;
  matchingResultStatus: string;
  workLocationMatchingResultReason: string;
  workDaysMatchingResultReason: string;
  workTimeMatchingResultReason: string;
  caregiverInfo: {
    caregiverId: number;
    name: string;
    phoneNumber: string;
    gender: Gender;
    age: number;
    profileImageUrl: string;
    caregiverDetailInfo: {
      caregiverCertificate: {
        grade: string;
        certificateNumber: string;
      };
      socialWorkerCertificate: {
        grade: string;
        certificateNumber: string;
      };
      nursingCareCertificate: {
        grade: string;
        certificateNumber: string;
      };
      havingCar: boolean;
      completeDementiaEducation: boolean;
      certificateNames: string[];
    };
    certificates: string[];
  };
  workApplicationInfo: {
    workApplicationId: number;
    isActive: boolean;
    careTypes: string[];
    workDays: (keyof typeof DAY_MAP.EN_TO_KR)[];
    workTimes: (keyof typeof TIME_MAP.EN_TO_KR)[];
    workSalaryAmount: number;
    workSalaryUnitType: string;
    lastModifiedDate: string;
    workLocations: {
      siDo: string;
      siGuGun: string;
      dongEupMyeon: string;
    }[];
  };
  careerInfo: {
    title: string;
    careerType: string;
    introduce: string;
    careerDetails: {
      workInstitution: string;
      workYear: string;
    }[];
  };
  mediationTypes: string[];
  mediationDescription: string;
}

export type RawCaregiver = {
  caregiverInfo?: {
    caregiverInfo?: {
      caregiverId: number;
      name: string;
      profileImageUrl: string;
    };
    applicationTitle: string;
  };
  matchingResultStatus: string;
};

export interface ElderMatchingStatus {
  recruitmentId: number;
  elderlyInfo: {
    elderlyName: string;
    elderlyAge: number;
    elderlyGender: Gender;
    elderlyProfileImageUrl: string;
  };
  matchingCount: number;
  applyCount: number;
}

export interface MatchingElderData {
  recruitmentInfo: RawMatchingElderData['recruitmentInfo'];
  matchedCaregivers: MatchingCaregiver[];
  appliedCaregivers: MatchingCaregiver[];
}

type CareerDetail = {
  workInstitution: string;
  workYear: string;
};

type CareerInfo = {
  careerType: string | null | undefined;
  introduce?: string | null;
  careerDetails?: CareerDetail[] | null;
};

export interface CareerSectionProps {
  careerInfo?: CareerInfo | null;
}

export type RecruitmentForm = {
  elderlyId: number | null;
  title: string;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  careTypes: string[];
  workSalaryUnitType: SalaryUnit;
  workSalaryAmount: number;
  description: string;
};

export type EditRecruitmentForm = {
  title: string;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  careTypes: string[];
  workSalaryUnitType: SalaryUnit;
  workSalaryAmount: number;
  description: string;
};
