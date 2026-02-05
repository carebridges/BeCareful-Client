import { ReportReason } from '@/types/common/profileReport';
import { useState } from 'react';

type ProfileType = 'institution' | 'caregiver';
type ActionOption = 'report' | 'block';

interface ReportPayload {
  reason: ReportReason;
  detail?: string;
}

interface ProfileActionsModals {
  sheet: boolean;
  reason: boolean;
  reportConfirm: boolean;
  blockCaregiver: boolean;
  blockInstitution: boolean;
  unblock: boolean;
}

export const useProfileActions = (
  profileType: ProfileType,
  isBlocked: boolean,
) => {
  const [selectedOption, setSelectedOption] = useState<ActionOption | null>(
    null,
  );
  const [reportPayload, setReportPayload] = useState<ReportPayload | null>(
    null,
  );

  const [modals, setModals] = useState<ProfileActionsModals>({
    sheet: false,
    reason: false,
    reportConfirm: false,
    blockCaregiver: false,
    blockInstitution: false,
    unblock: false,
  });

  const openModal = (key: keyof ProfileActionsModals) => {
    setModals((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: keyof ProfileActionsModals) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  };

  const closeAllModals = () => {
    setModals({
      sheet: false,
      reason: false,
      reportConfirm: false,
      blockCaregiver: false,
      blockInstitution: false,
      unblock: false,
    });
  };

  const handleOpenSheet = () => {
    setSelectedOption(null);
    openModal('sheet');
  };

  const handleSheetConfirm = () => {
    if (!selectedOption) return;

    closeModal('sheet');

    if (selectedOption === 'report') {
      openModal('reason');
      return;
    }

    if (selectedOption === 'block') {
      if (isBlocked) {
        openModal('unblock');
        return;
      }
      openModal(
        profileType === 'institution' ? 'blockInstitution' : 'blockCaregiver',
      );
    }
  };

  const handleReasonConfirm = (payload: ReportPayload) => {
    setReportPayload(payload);
    closeModal('reason');
    openModal('reportConfirm');
  };

  const handleReportSubmit = () => {
    if (!reportPayload) return;

    // TODO
    console.log('신고 제출:', reportPayload);

    setReportPayload(null);
    closeModal('reportConfirm');
  };

  const handleBlock = () => {
    // TODO
    console.log('차단 처리');
    closeAllModals();
  };

  const handleUnblock = () => {
    // TODO
    console.log('차단 해제');
    closeModal('unblock');
  };

  return {
    selectedOption,
    setSelectedOption,
    reportPayload,
    modals,
    handleOpenSheet,
    handleSheetConfirm,
    handleReasonConfirm,
    handleReportSubmit,
    handleBlock,
    handleUnblock,
    closeModal,
  };
};
