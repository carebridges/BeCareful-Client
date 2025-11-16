import { axiosInstance } from '@/api/axiosInstance';
import { ElderDetailResponse } from '@/types/Elderly';
import {
  ElderMatchingStatus,
  MatchingElderData,
  RawMatchingCaregiver,
  MatchingCaregiver,
  RecruitmentForm,
  RawMatchingElderData,
} from '@/types/Matching.socialWorker';

import { RecruitmentDetailResponse } from '@/types/Socialworker/matching';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useHireCaregiver = () =>
  useMutation({
    mutationFn: async ({
      matchingId,
      workStartDate,
    }: {
      matchingId: number;
      workStartDate: string;
    }) => {
      const { data } = await axiosInstance.post(
        `/matching/social-worker/${matchingId}/hire`,
        undefined,
        {
          params: { workStartDate },
        },
      );
      return data;
    },
  });

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

export const useMatchingRecruitment = (recruitmentId: string) =>
  useQuery<MatchingElderData>({
    queryKey: ['matching-recruitment', recruitmentId],
    queryFn: async () => {
      const data = await getMatchingRecruitment(recruitmentId); // Raw 타입

      return {
        ...data,
        matchedCaregivers: data.matchedCaregivers.map(flattenCaregiver),
        appliedCaregivers: data.appliedCaregivers.map(flattenCaregiver),
      };
    },
    enabled: !!recruitmentId,
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

export const useRegisterMatchingRecruitment = () =>
  useMutation({
    mutationFn: async (payload: RecruitmentForm) => {
      const { data } = await axiosInstance.post(
        '/matching/social-worker/recruitment',
        payload,
      );
      return data;
    },
  });

export const useElderDetail = (elderlyId: number | null) =>
  useQuery<ElderDetailResponse>({
    queryKey: ['elderlyDetail', elderlyId],
    enabled: !!elderlyId,
    queryFn: async () => {
      const { data } = await axiosInstance.get<ElderDetailResponse>(
        `/elderly/${elderlyId}`,
      );
      return data;
    },
  });

export const useRecruitmentDetail = (recruitmentId: number) =>
  useQuery({
    queryKey: ['recruitmentDetail', recruitmentId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<RecruitmentDetailResponse>(
        `/matching/social-worker/recruitment/${recruitmentId}`,
      );
      return data;
    },
    enabled: !!recruitmentId,
  });

export const useCloseRecruitment = (recruitmentId: number) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(
        `/matching/social-worker/recruitment/${recruitmentId}/close`,
      );
      return data;
    },
  });

export const useDeleteRecruitment = (recruitmentId: number) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `/matching/social-worker/recruitment/${recruitmentId}`,
      );
      return data;
    },
  });
