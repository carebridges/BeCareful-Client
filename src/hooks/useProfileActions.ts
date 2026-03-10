import { useState } from 'react';
import { ReportReason } from '@/types/common';
import {
  useBlockCaregiverBySocialWorker,
  useUnblockCaregiverBySocialWorker,
  useBlockSocialWorkerByCaregiver,
  useUnblockSocialWorkerByCaregiver,
  useReportCaregiverChat,
  useReportSocialWorkerChat,
} from '@/api/profileAction';
import { AxiosError } from 'axios';

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

interface UseProfileActionsParams {
  profileType: ProfileType;
  isBlocked: boolean;
  targetId: number;
  chatRoomId?: number;
  onSuccess?: () => void;
  onReportSuccess?: () => void;
  onBlockSuccess?: () => void;
  onUnblockSuccess?: () => void;
  onErrorMessage?: (message: string) => void;
}

const getServerMessage = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string }>;

  return (
    axiosError?.response?.data?.message ?? '요청 처리 중 문제가 발생했습니다.'
  );
};

export const useProfileActions = ({
  profileType,
  isBlocked,
  targetId,
  chatRoomId,
  onSuccess,
  onReportSuccess,
  onBlockSuccess,
  onUnblockSuccess,
  onErrorMessage,
}: UseProfileActionsParams) => {
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

  const { mutate: blockCaregiver } = useBlockCaregiverBySocialWorker();
  const { mutate: unblockCaregiver } = useUnblockCaregiverBySocialWorker();
  const { mutate: blockSocialWorker } = useBlockSocialWorkerByCaregiver();
  const { mutate: unblockSocialWorker } = useUnblockSocialWorkerByCaregiver();
  const { mutate: reportSocialWorker } = useReportSocialWorkerChat();
  const { mutate: reportCaregiver } = useReportCaregiverChat();

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
      if (!chatRoomId) {
        alert('채팅방에서만 신고할 수 있습니다.');
        return;
      }

      openModal('reason');
      return;
    }

    if (isBlocked) {
      openModal('unblock');
      return;
    }

    openModal(
      profileType === 'institution' ? 'blockInstitution' : 'blockCaregiver',
    );
  };

  const handleReasonConfirm = (payload: ReportPayload) => {
    setReportPayload(payload);
    closeModal('reason');
    openModal('reportConfirm');
  };

  const handleReportSubmit = () => {
    if (!reportPayload) return;

    if (!chatRoomId) {
      closeModal('reportConfirm');
      alert('채팅방에서만 신고할 수 있습니다.');
      return;
    }

    if (profileType === 'caregiver') {
      reportCaregiver(
        {
          chatRoomId,
          payload: reportPayload,
        },
        {
          onSuccess: () => {
            setReportPayload(null);
            closeModal('reportConfirm');
            onReportSuccess?.();
            onSuccess?.();
          },
          onError: (error) => {
            onErrorMessage?.(getServerMessage(error));
          },
        },
      );
      return;
    }

    reportSocialWorker(
      {
        chatRoomId,
        payload: reportPayload,
      },
      {
        onSuccess: () => {
          setReportPayload(null);
          closeModal('reportConfirm');
          onReportSuccess?.();
          onSuccess?.();
        },
      },
    );
  };

  const handleBlock = () => {
    if (profileType === 'caregiver') {
      blockCaregiver(targetId, {
        onSuccess: () => {
          closeAllModals();
          onBlockSuccess?.();
          onSuccess?.();
        },
        onError: (error) => {
          onErrorMessage?.(getServerMessage(error));
        },
      });
      return;
    }
    blockSocialWorker(targetId, {
      onSuccess: () => {
        closeAllModals();
        onBlockSuccess?.();
        onSuccess?.();
      },
      onError: (error) => {
        onErrorMessage?.(getServerMessage(error));
      },
    });
  };

  const handleUnblock = () => {
    if (profileType === 'caregiver') {
      unblockCaregiver(targetId, {
        onSuccess: () => {
          closeModal('unblock');
          onUnblockSuccess?.();
          onSuccess?.();
        },
        onError: (error) => {
          onErrorMessage?.(getServerMessage(error));
        },
      });
      return;
    }

    unblockSocialWorker(targetId, {
      onSuccess: () => {
        closeModal('unblock');
        onUnblockSuccess?.();
        onSuccess?.();
      },
    });
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
