import { putApplication } from '@/api/caregiver';
import { WorkApplicationRequest } from '@/types/Caregiver/work';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePutApplicationOptions {
  onSuccessCallback?: (dataExists: boolean) => void;
}

export const usePutApplicationMutation = (
  options?: UsePutApplicationOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationData: WorkApplicationRequest) =>
      putApplication(applicationData),
    onSuccess: () => {
      console.log('신청서 등록/수정하기 성공');
      queryClient.invalidateQueries({
        queryKey: ['caregiverApplication'],
      });
      const dataExists = !!queryClient.getQueryData(['caregiverApplication']);
      options?.onSuccessCallback?.(dataExists);
    },
    onError: (error) => {
      console.log('신청서 등록/수정하기 실패', error);
    },
  });
};
