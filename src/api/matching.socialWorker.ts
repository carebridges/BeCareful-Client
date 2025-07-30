import { axiosInstance } from '@/api/axiosInstance';
import {
  ElderMatchingStatus,
  MatchingCaregiver,
  MatchingElderData,
  MatchingRecruitmentPayload,
  RawCaregiver,
} from '@/types/Matching.socialWorker';
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

export const useRegisterMatchingRecruitment = () =>
  useMutation({
    mutationFn: async (payload: MatchingRecruitmentPayload) => {
      const { data } = await axiosInstance.post(
        '/matching/social-worker/recruitment',
        payload,
      );
      return data;
    },
  });

export const getMatchingRecruitment = async (recruitmentId: string) => {
  const { data } = await axiosInstance.get<MatchingElderData>(
    `/matching/social-worker/recruitment/${recruitmentId}`,
  );
  return data;
};

const flattenCaregiver = (raw: RawCaregiver): MatchingCaregiver => ({
  caregiverInfo: {
    caregiverId: raw.caregiverInfo?.caregiverInfo?.caregiverId ?? 0,
    name: raw.caregiverInfo?.caregiverInfo?.name ?? '',
    profileImageUrl: raw.caregiverInfo?.caregiverInfo?.profileImageUrl ?? '',
    applicationTitle: raw.caregiverInfo?.applicationTitle ?? '',
  },
  matchingResultStatus: raw.matchingResultStatus,
});

export const useMatchingRecruitment = (recruitmentId: string) =>
  useQuery({
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
