import { putMemo } from '@/api/caregiver';
import { MemoEditRequest } from '@/types/Caregiver/home';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePutMemoOptions {
  onSuccessCallback?: () => void;
}

export const usePutMemoMutation = (
  workId: number,
  options?: UsePutMemoOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: MemoEditRequest) => putMemo(workId, note),
    onSuccess: () => {
      console.log('나의 일자리: 메모 수정 성공');
      queryClient.invalidateQueries({ queryKey: ['note', workId] });
      queryClient.invalidateQueries({
        queryKey: ['caregiverCompletedMatchingList'],
      });
      options?.onSuccessCallback?.();
    },
    onError: (error) => {
      console.log('나의 일자리: 메모 수정 실패', error);
    },
  });
};
