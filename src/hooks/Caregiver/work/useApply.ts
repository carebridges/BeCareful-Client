import { useState } from 'react';
import { usePostApplyMutation } from '@/hooks/Caregiver/mutation/useApplyMutation';
import { handleModal } from '@/utils/handleModal';

export const useApply = (recruitmentId: number) => {
  // 지원하기 팝업
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // 지원 완료 팝업
  const [isCompleteApplyModalOpen, setIsCompleteApplyModalOpen] =
    useState(false);

  // 매칭 공고 지원
  const { mutate: applyMutation } = usePostApplyMutation(recruitmentId, {
    onSuccessCallback: () =>
      handleModal(setIsCompleteApplyModalOpen, setIsApplyModalOpen),
  });

  // 지원하기
  const handleCompleteApply = () => {
    applyMutation();
  };

  return {
    isApplyModalOpen,
    setIsApplyModalOpen,
    isCompleteApplyModalOpen,
    setIsCompleteApplyModalOpen,
    handleCompleteApply,
  };
};
