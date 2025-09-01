import { useState } from 'react';
import { usePostApplyMutation } from '@/hooks/Caregiver/mutation/useApplyMutation';

export const useApply = (recruitmentId: number) => {
  // 지원하기 팝업
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const handleCompleteApply = () => {
    setIsApplyModalOpen(true);
    applyMutation();
  };

  // 매칭 공고 지원
  const { mutate: applyMutation } = usePostApplyMutation(recruitmentId, {
    onSuccessCallback: () => {
      setIsApplyModalOpen(false); // 모달 닫기
    },
  });

  return {
    isApplyModalOpen,
    setIsApplyModalOpen,
    handleCompleteApply,
  };
};
