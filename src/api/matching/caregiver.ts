import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CaregiverCompletedMatching } from '@/types/caregiver';
import {
  MatchingMyRecruitmentDetailResponse,
  MatchingRecruitmentMediateRequest,
  MatchingRecruitmentResponse,
  Recruitment,
  RecruitmentListResponse,
} from '@/types/matching';

// ==================== 확정된 일자리 ====================
/* 확정된 일자리의 리스트 반환 - 나의 일자리 */
export const useCompletedMatchingList = () => {
  return useQuery<CaregiverCompletedMatching[], Error>({
    queryKey: ['caregiverCompletedMatchingList'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/caregiver/my/completed-matching-list',
      );
      return response.data;
    },
  });
};

/* 나의 일자리 화면에서 메모 수정 */
export const useUpdateMatchingMemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      completedMatchingId,
      memo,
    }: {
      completedMatchingId: number;
      memo: { note: string };
    }) => {
      const response = await axiosInstance.put(
        `/caregiver/my/complete-matching-list/${completedMatchingId}`,
        memo,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverCompletedMatchingList'],
      });
    },
  });
};

// ==================== 공고 목록 ====================
/* 매칭 공고 리스트 조회 */
export const useRecruitmentList = () => {
  return useQuery<Recruitment[], Error>({
    queryKey: ['caregiverRecruitmentList'],
    queryFn: async () => {
      const response = await axiosInstance.get('/matching/caregiver/list');
      return response.data;
    },
  });
};

/* 매칭 공고 상세 조회 */
export const useRecruitmentDetail = (recruitmentId: number) => {
  return useQuery<MatchingRecruitmentResponse, Error>({
    queryKey: ['caregiverRecruitmentDetail', recruitmentId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/matching/caregiver/recruitment/${recruitmentId}`,
      );
      return response.data;
    },
    enabled: !!recruitmentId,
  });
};

// ==================== 지원 관리 ====================
/* 매칭 공고 지원 */
export const useApplyRecruitment = (recruitmentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/matching/caregiver/recruitment/${recruitmentId}/apply`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentDetail', recruitmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['caregiverApplicationList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['caregiverCompletedMatchingList'],
      });
    },
  });
};

/* 근무 조건 조율 */
export const useMediateRecruitment = (recruitmentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediateData: MatchingRecruitmentMediateRequest) => {
      const response = await axiosInstance.post(
        `/matching/caregiver/recruitment/${recruitmentId}/mediate`,
        mediateData,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentDetail', recruitmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['caregiverApplicationList'],
      });
    },
  });
};

/* 지원 현황 조회 */
export const useMyApplicationList = (activeTab: string) => {
  return useQuery<RecruitmentListResponse, Error>({
    queryKey: ['caregiverApplicationList', activeTab],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/matching/caregiver/my/recruitment',
        {
          params: {
            appliedStatusFilter: activeTab,
          },
        },
      );
      return response.data;
    },
  });
};

/* 지원 현황 상세 조회 */
export const useMyApplicationDetail = (recruitmentId: number) => {
  return useQuery<MatchingMyRecruitmentDetailResponse, Error>({
    queryKey: ['caregiverApplicationDetail', recruitmentId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/matching/caregiver/my/recruitment/${recruitmentId}`,
      );
      return response.data;
    },
    enabled: !!recruitmentId,
  });
};
