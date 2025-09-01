import { useState } from 'react';
import { handleModal } from '@/utils/handleModal';
import { usePostRejectMutation } from '@/hooks/Caregiver/mutation/useApplyMutation';

export const useReject = (recruitmentId: number) => {
  // 거절하기 팝업
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  // 그래도 거절 팝업
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 거절하기 팝업 - 거절하기 버튼
  const handleReject = () => {
    rejectMutation();
  };

  // 매칭 공고 거절
  const { mutate: rejectMutation } = usePostRejectMutation(recruitmentId, {
    onSuccessCallback: () => {
      handleModal(setIsDeleteModalOpen, setIsRejectModalOpen);
    },
  });

  return {
    isRejectModalOpen,
    setIsRejectModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleReject,
  };
};
