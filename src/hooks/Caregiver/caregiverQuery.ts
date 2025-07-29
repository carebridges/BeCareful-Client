import {
  getApplication,
  getApplicationDetail,
  getApplicationList,
  getCareer,
  getCaregiverHomeInfo,
  getCaregiverMyPageInfo,
  getMyWorkList,
  getRecruitmentDetail,
  getRecruitmentList,
} from '@/api/caregiver';
import {
  MatchingMyRecruitmentDetailResponse,
  MatchingMyRecruitmentResponse,
} from '@/types/Caregiver/apply';
import {
  CaregiverCompletedMatchingResponse,
  CaregiverHomeResponse,
} from '@/types/Caregiver/home';
import { CareerResponse, CaregiverMyResponse } from '@/types/Caregiver/mypage';
import {
  MatchingListResponse,
  MatchingRecruitmentResponse,
  WorkApplicationResponse,
} from '@/types/Caregiver/work';
import { useQuery } from '@tanstack/react-query';

/* Apply */
// CaregiverApplyDetailPage
export const useApplicationDetailQuery = (recruitmentId: number) => {
  return useQuery<MatchingMyRecruitmentDetailResponse, Error>({
    queryKey: ['caregiverApplicationDetail', recruitmentId],
    queryFn: () => getApplicationDetail(recruitmentId),
    enabled: !!recruitmentId,
  });
};

// CaregiverApplyPage
export const useApplicationListQuery = (activeTab: string) => {
  return useQuery<MatchingMyRecruitmentResponse, Error>({
    queryKey: ['caregiverApplicationList', activeTab],
    queryFn: () => getApplicationList(activeTab),
  });
};

/* Home */
// CaregiverHomePage
export const useCaregiverHomeInfoQuery = () => {
  return useQuery<CaregiverHomeResponse, Error>({
    queryKey: ['caregiverHomeInfo'],
    queryFn: getCaregiverHomeInfo,
  });
};

// CaregiverMyworkPage
export const useMyWorkListQuery = () => {
  return useQuery<CaregiverCompletedMatchingResponse, Error>({
    queryKey: ['caregiverCompletedMatching'],
    queryFn: getMyWorkList,
  });
};

/* MyPage */
// CaregiverApplicationPage
export const useApplicationQuery = () => {
  return useQuery<WorkApplicationResponse, Error>({
    queryKey: ['caregiverApplication'],
    queryFn: getApplication,
  });
};

// CaregiverCareerPage
export const useCareerQuery = () => {
  return useQuery<CareerResponse, Error>({
    queryKey: ['caregiverCareer'],
    queryFn: getCareer,
  });
};

// CaregiverMyPage
export const useCaregiverMyPageInfoQuery = () => {
  return useQuery<CaregiverMyResponse, Error>({
    queryKey: ['caregiverMypageInfo'],
    queryFn: getCaregiverMyPageInfo,
  });
};

/* Work */
// CaregiverWorkDetailPage
export const useRecruitmentDetailQuery = (recruitmentId: number) => {
  return useQuery<MatchingRecruitmentResponse, Error>({
    queryKey: ['caregiverRecruitmentDetail', recruitmentId],
    queryFn: () => getRecruitmentDetail(recruitmentId),
  });
};

// CaregiverWorkPage
export const useRecruitmentListQuery = () => {
  return useQuery<MatchingListResponse, Error>({
    queryKey: ['caregiverWorkList'],
    queryFn: getRecruitmentList,
  });
};
