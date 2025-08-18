import { postApply, postMediate, postReject } from '@/api/caregiver';
import { MatchingRecruitmentMediateRequest } from '@/types/Caregiver/work';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseApplyOptions {
  onSuccessCallback?: () => void;
}

export const usePostApplyMutation = (
  recruitmentId: number,
  options?: UseApplyOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postApply(recruitmentId),
    onSuccess: () => {
      console.log('매칭 공고 지원 성공');
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentDetail', recruitmentId],
      });
      options?.onSuccessCallback?.();
    },
    onError: (error) => {
      console.log('매칭 공고 지원 실패', error);
    },
  });
};

export const usePostRejectMutation = (
  recruitmentId: number,
  options?: UseApplyOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postReject(recruitmentId),
    onSuccess: () => {
      console.log('매칭 공고 거절 성공');
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentDetail', recruitmentId],
      });
      options?.onSuccessCallback?.();
    },
    onError: (error) => {
      console.log('매칭 공고 거절 실패', error);
    },
  });
};

export const usePostMediateMutation = (
  recruitmentId: number,
  options?: UseApplyOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mediateData: MatchingRecruitmentMediateRequest) =>
      postMediate(recruitmentId, mediateData),
    onSuccess: () => {
      console.log('매칭 공고 근무 조건 조율 성공');
      queryClient.invalidateQueries({
        queryKey: ['caregiverRecruitmentDetail', recruitmentId],
      });
      options?.onSuccessCallback?.();
    },
    onError: (error) => {
      console.log('매칭 공고 근무 조건 조율 실패', error);
    },
  });
};
