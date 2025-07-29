import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CaregiverMyRequest } from '@/types/Caregiver/mypage';
import { putCaregiverMy } from '@/api/caregiver';

interface UsePutMyOptions {
  onSuccessCallback?: () => void;
}

export const usePutMyMutation = (options?: UsePutMyOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (myData: CaregiverMyRequest) => putCaregiverMy(myData),
    onSuccess: () => {
      console.log('프로필 수정하기 성공');
      queryClient.invalidateQueries({
        queryKey: ['caregiverMy'],
      });
      options?.onSuccessCallback?.();
    },
    onError: (error) => {
      console.log('프로필 수정하기 실패', error);
    },
  });
};
