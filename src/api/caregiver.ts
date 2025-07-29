import { axiosInstance } from '@/api/axiosInstance';
import {
  MatchingMyRecruitmentDetailResponse,
  MatchingMyRecruitmentResponse,
} from '@/types/Caregiver/apply';
import {
  CaregiverCompletedMatchingResponse,
  CaregiverHomeResponse,
  MemoEditRequest,
} from '@/types/Caregiver/home';
import {
  CareerRequest,
  CareerResponse,
  CaregiverMyRequest,
  CaregiverMyResponse,
} from '@/types/Caregiver/mypage';
import {
  MatchingListResponse,
  MatchingRecruitmentMediateRequest,
  MatchingRecruitmentResponse,
  WorkApplicationRequest,
  WorkApplicationResponse,
} from '@/types/Caregiver/work';

/* 홈화면 */
// 요양보호사 홈 화면 구성 데이터 조회
export const getCaregiverHomeInfo =
  async (): Promise<CaregiverHomeResponse> => {
    const response = await axiosInstance.get('/caregiver/home');
    return response.data;
  };

/* 나의 일자리 */
// 확정된 일자리의 리스트 반환 - 나의 일자리
export const getMyWorkList =
  async (): Promise<CaregiverCompletedMatchingResponse> => {
    const response = await axiosInstance.get(
      '/caregiver/my/completed-matching-list',
    );
    return response.data;
  };

// 나의 일자리 화면에서 메모 수정
export const putMemo = async (
  completedMatchingId: number,
  memo: MemoEditRequest,
) => {
  const response = await axiosInstance.put(
    `/caregiver/my/complete-matching-list/${completedMatchingId}`,
    memo,
  );
  return response;
};

/* 마이페이지 */
// 요양보호사 마이페이지 홈 화면 데이터 조회
export const getCaregiverMyPageInfo =
  async (): Promise<CaregiverMyResponse> => {
    const response = await axiosInstance.get('/caregiver/my');
    return response.data;
  };

// 요양보호사 마이페이지 수정
export const putCaregiverMy = async (myData: CaregiverMyRequest) => {
  const response = await axiosInstance.put('/caregiver/my', myData);
  return response;
};

// 경력서 조회
export const getCareer = async (): Promise<CareerResponse> => {
  const response = await axiosInstance.get('/caregiver/career');
  return response.data;
};

// 경력서 등록/수정
export const putCareer = async (career: CareerRequest) => {
  const response = await axiosInstance.put('/caregiver/career', career);
  return response;
};

// 신청서 조회
export const getApplication = async (): Promise<WorkApplicationResponse> => {
  const response = await axiosInstance.get('/caregiver/work-application');
  return response.data;
};

// 신청서 등록
export const putApplication = async (application: WorkApplicationRequest) => {
  const response = await axiosInstance.put(
    '/caregiver/work-application',
    application,
  );
  return response;
};

// 일자리 신청 활성화
export const workApplicationActive = async () => {
  const response = await axiosInstance.get(
    '/caregiver/work-application/active',
  );
  return response;
};

// 일자리 신청 비활성화
export const workApplicationInactive = async () => {
  const response = await axiosInstance.get(
    '/caregiver/work-application/inactive',
  );
  return response;
};

/* 일자리 */
// 매칭 공고 리스트 조회
export const getRecruitmentList = async (): Promise<MatchingListResponse> => {
  const response = await axiosInstance.get('/matching/caregiver/list');
  return response.data;
};

// 매칭 공고 상세 조회
export const getRecruitmentDetail = async (
  recruitmentId: number,
): Promise<MatchingRecruitmentResponse> => {
  const response = await axiosInstance.get(
    `/matching/caregiver/recruitment/${recruitmentId}`,
  );
  return response.data;
};

// 매칭 공고 거절
export const postReject = async (recruitmentId: number) => {
  const response = await axiosInstance.post(
    `/matching/caregiver/recruitment/${recruitmentId}/reject`,
  );
  return response;
};

// 매칭 공고 지원
export const postApply = async (recruitmentId: number) => {
  const response = await axiosInstance.post(
    `/matching/caregiver/recruitment/${recruitmentId}/apply`,
  );
  return response;
};

// 근무 조건 조율
export const postMediate = async (
  recruitmentId: number,
  mediateData: MatchingRecruitmentMediateRequest,
) => {
  const response = await axiosInstance.post(
    `/matching/caregiver/recruitment/${recruitmentId}/mediate`,
    mediateData,
  );
  return response;
};

/* 지원현황 */
// 지원 현황 조회
export const getApplicationList = async (
  matchingApplicationStatus: string,
): Promise<MatchingMyRecruitmentResponse> => {
  const response = await axiosInstance.get(
    '/matching/caregiver/my/recruitment',
    {
      params: {
        matchingApplicationStatus: matchingApplicationStatus,
      },
    },
  );
  return response.data;
};

// 지원 현황 상세 조회
export const getApplicationDetail = async (
  recruitmentId: number,
): Promise<MatchingMyRecruitmentDetailResponse> => {
  const response = await axiosInstance.get(
    `/matching/caregiver/my/recruitment/${recruitmentId}`,
  );
  return response.data;
};
