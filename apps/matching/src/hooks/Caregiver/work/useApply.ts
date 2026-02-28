import { useState } from 'react';
import { handleModal } from '@/utils/handleModal';
import { useApplyRecruitment } from '@/api/matching/caregiver';

export const useApply = (recruitmentId: number) => {
  // 지원하기 팝업
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // 지원 완료 팝업
  const [isCompleteApplyModalOpen, setIsCompleteApplyModalOpen] =
    useState(false);

  // 매칭 공고 지원
  const { mutate: applyRecruitment } = useApplyRecruitment(recruitmentId);

  // 지원하기
  const handleCompleteApply = () => {
    applyRecruitment(undefined, {
      onSuccess: () =>
        handleModal(setIsCompleteApplyModalOpen, setIsApplyModalOpen),
    });
  };

  return {
    isApplyModalOpen,
    setIsApplyModalOpen,
    isCompleteApplyModalOpen,
    setIsCompleteApplyModalOpen,
    handleCompleteApply,
  };
};
