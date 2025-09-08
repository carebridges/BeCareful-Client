import { putCareer } from '@/api/caregiver';
import { CareerRequest } from '@/types/Caregiver/mypage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePutCareerOptions {
  onSuccessCallback?: () => void;
}

export const usePutCareerMutation = (options?: UsePutCareerOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (careerData: CareerRequest) => putCareer(careerData),
    onSuccess: () => {
      console.log('경력서 등록/수정하기 성공');
      queryClient.invalidateQueries({ queryKey: ['caregiverCareer'] });
      queryClient.invalidateQueries({ queryKey: ['caregiverMypageInfo'] });
      options?.onSuccessCallback?.();
    },
    onError: (error) => {
      console.log('경력서 등록/수정하기 실패', error);
    },
  });
};
