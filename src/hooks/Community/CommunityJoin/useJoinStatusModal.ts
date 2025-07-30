import { useEffect, useState } from 'react';
import { useCommunityAccess } from '@/api/communityAssociation';

export const useJoinStatusModal = () => {
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [associationName, setAssociationName] = useState('');

  const [modals, setModals] = useState({
    REJECTED: false,
    PENDING: false,
    APPROVED: false,
  });

  const { data, isSuccess } = useCommunityAccess();

  useEffect(() => {
    if (!isSuccess || !data) return;

    const { accessStatus, associationName } = data;
    setAssociationName(associationName);
    if (accessStatus in modals) {
      setModals((prev) => ({ ...prev, [accessStatus]: true }));

    }
  }, [isSuccess, data]);

  return {
    isLimitModalOpen,
    isRejectedModalOpen: modals.REJECTED,
    isPendingModalOpen: modals.PENDING,
    isApprovedModalOpen: modals.APPROVED,
    associationName,
    openLimitModal: () => setIsLimitModalOpen(true),
    closeLimitModal: () => setIsLimitModalOpen(false),
    closeRejectedModal: () =>
      setModals((prev) => ({ ...prev, REJECTED: false })),
    closePendingModal: () => setModals((prev) => ({ ...prev, PENDING: false })),
    closeApprovedModal: () =>
      setModals((prev) => ({ ...prev, APPROVED: false })),
  };
};
