import {
  workApplicationActive,
  workApplicationInactive,
} from '@/api/caregiver';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseWorkApplicationToggleOptions {
  onSuccessCallback?: (isActive: boolean) => void;
}

export const useWorkApplicationToggleMutation = (
  options?: UseWorkApplicationToggleOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isActive: boolean) => {
      // 현재 활성 상태라면 비활성화, 비활성 상태라면 활성화
      if (isActive) {
        return workApplicationInactive();
      } else {
        return workApplicationActive();
      }
    },
    onSuccess: (_, isActive) => {
      console.log('일자리 매칭 상태 변경 성공');
      queryClient.invalidateQueries({ queryKey: ['caregiverApplication'] });
      options?.onSuccessCallback?.(!isActive);
    },
    onError: (error) => {
      console.log('일자리 매칭 상태 변경 실패', error);
    },
  });
};
