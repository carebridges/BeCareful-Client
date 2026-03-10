import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  EditRecruitmentForm,
  ElderMatchingStatus,
  MatchingCaregiver,
  MatchingElderData,
  RawMatchingCaregiver,
  RawMatchingElderData,
  RecruitmentDetail,
  RecruitmentForm,
  RecruitmentSearchResponse,
} from '@/types/matching';
import { SocialWorkerProfileViewResponse } from '@/types/socialworker';

// ==================== 매칭 현황 ====================
export const getMatchingRecruitment = async (
  recruitmentId: string,
): Promise<RawMatchingElderData> => {
  const { data } = await axiosInstance.get(
    `/matching/social-worker/recruitment/${recruitmentId}/matching-status`,
  );
  return data;
};

const flattenCaregiver = (raw: RawMatchingCaregiver): MatchingCaregiver => ({
  caregiverInfo: {
    caregiverId: raw.caregiverInfo.caregiverInfo.caregiverId,
    name: raw.caregiverInfo.caregiverInfo.name,
    profileImageUrl: raw.caregiverInfo.caregiverInfo.profileImageUrl,
    applicationTitle: raw.caregiverInfo.applicationTitle,
  },
  matchingResultStatus: raw.matchingResultStatus,
});

/* 매칭 현황 조회 */
export const useMatchingRecruitment = (recruitmentId: string) =>
  useQuery<MatchingElderData>({
    queryKey: ['matching-recruitment', recruitmentId],
    queryFn: async () => {
      const data = await getMatchingRecruitment(recruitmentId);

      return {
        ...data,
        matchedCaregivers: data.matchedCaregivers.map(flattenCaregiver),
        appliedCaregivers: data.appliedCaregivers.map(flattenCaregiver),
      };
    },
    enabled: !!recruitmentId,
  });

/* 어르신별 매칭 현황 */
export const getElderMatchingList = async (
  status: string,
): Promise<ElderMatchingStatus[]> => {
  const { data } = await axiosInstance.get(
    `/matching/social-worker/list?matchingStatusFilter=${status}`,
  );
  return data;
};

export const useElderMatchingList = (status: string) => {
  return useQuery({
    queryKey: ['elder-matching-list', status],
    queryFn: () => getElderMatchingList(status),
  });
};

// ==================== 공고 관리 ====================
/* 공고 등록 */
export const useRegisterRecruitment = () =>
  useMutation({
    mutationFn: async (payload: RecruitmentForm) => {
      const { data } = await axiosInstance.post(
        '/matching/social-worker/recruitment',
        payload,
      );
      return data;
    },
  });

/* 공고 상세 조회 */
export const useRecruitmentDetail = (recruitmentId: number) =>
  useQuery({
    queryKey: ['recruitmentDetail', recruitmentId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<RecruitmentDetail>(
        `/matching/social-worker/recruitment/${recruitmentId}`,
      );
      return data;
    },
    enabled: !!recruitmentId,
  });

/* 공고 마감 */
export const useCloseRecruitment = (recruitmentId: number) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(
        `/matching/social-worker/recruitment/${recruitmentId}/close`,
      );
      return data;
    },
  });

/* 공고 삭제 */
export const useDeleteRecruitment = (recruitmentId: number) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `/matching/social-worker/recruitment/${recruitmentId}`,
      );
      return data;
    },
  });

/* 공고 수정 */
export const useEditRecruitment = (recruitmentId: number) =>
  useMutation({
    mutationFn: (body: EditRecruitmentForm) =>
      axiosInstance.put(
        `/matching/social-worker/recruitment/${recruitmentId}`,
        body,
      ),
  });

/* 지원 보류 */
export const usePendingMatching = () =>
  useMutation({
    mutationFn: (applicationId: number) =>
      axiosInstance.patch(
        `/matching/social-worker/${applicationId}/pending`,
        null,
        {
          params: { applicationId },
        },
      ),
  });

const createRecruitmentQueryParams = (
  status: '매칭중' | '매칭완료',
  page: number,
  size: number,
) => ({
  elderlyMatchingStatusFilter: status,
  page: Math.max(page - 1, 0),
  size,
});

/* 공고 목록 조회 */
export const useRecruitment = (
  status: '매칭중' | '매칭완료' | null,
  page: number,
  size: number,
  keyword?: string,
) =>
  useQuery({
    enabled: !!status,
    queryKey: ['recruitment', status, page, size, keyword?.trim() || ''],
    queryFn: async (): Promise<RecruitmentSearchResponse> => {
      const params = createRecruitmentQueryParams(status!, page, size);
      const kw = keyword?.trim();

      if (kw) {
        const { data } = await axiosInstance.post<RecruitmentSearchResponse>(
          '/matching/social-worker/recruitment/search',
          { keyword: kw },
          { params },
        );
        return data;
      }

      const { data } = await axiosInstance.get<RecruitmentSearchResponse>(
        '/matching/social-worker/recruitment',
        { params },
      );
      return data;
    },
  });

// ==================== 요양보호사 상세 ====================
/* 요양보호사 채용 제안 */
export const useHireCaregiver = () =>
  useMutation({
    mutationFn: async ({
      recruitmentId,
      caregiverId,
      workStartDate,
    }: {
      recruitmentId: number;
      caregiverId: number;
      workStartDate: string;
    }) => {
      const { data } = await axiosInstance.post(
        `/matching/social-worker/recruitment/${recruitmentId}/caregiver/${caregiverId}/propose`,
        undefined,
        {
          params: { workStartDate },
        },
      );
      return data;
    },
  });

export const getCaregiverDetail = async (
  recruitmentId: string,
  caregiverId: string,
) => {
  const { data } = await axiosInstance.get(
    `/matching/social-worker/recruitment/${recruitmentId}/caregiver/${caregiverId}`,
  );
  return data;
};

export const useCaregiverDetail = (
  recruitmentId: string,
  caregiverId: string,
) =>
  useQuery({
    queryKey: ['caregiver-detail', recruitmentId, caregiverId],
    queryFn: () => getCaregiverDetail(recruitmentId, caregiverId),
    enabled: !!recruitmentId && !!caregiverId,
  });

export const useSocialWorkerProfileView = (socialWorkerId: string) => {
  return useQuery({
    queryKey: ['socialWorkerProfile', socialWorkerId],
    queryFn: async () => {
      const response = await axiosInstance.get<SocialWorkerProfileViewResponse>(
        `/social-worker/${socialWorkerId}/profile`,
      );
      return response.data;
    },
    enabled: !!socialWorkerId,
  });
};
