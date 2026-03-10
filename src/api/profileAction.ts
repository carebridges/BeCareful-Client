import { axiosInstance } from '@/api/axiosInstance';
import { mapReportReasonToApi } from '@/components/ProfileView/mapReportReasonToApi';
import { ReportRequest } from '@/types/common';
import { useMutation } from '@tanstack/react-query';

const blockCaregiverBySocialWorker = async (caregiverId: number) => {
  await axiosInstance.post(
    `/social-worker/my/blocked-caregiver/${caregiverId}`,
  );
};

export const useBlockCaregiverBySocialWorker = () => {
  return useMutation({
    mutationFn: (caregiverId: number) =>
      blockCaregiverBySocialWorker(caregiverId),
  });
};

const unblockCaregiverBySocialWorker = async (caregiverId: number) => {
  await axiosInstance.delete(
    `/social-worker/my/blocked-caregiver/${caregiverId}`,
  );
};

export const useUnblockCaregiverBySocialWorker = () => {
  return useMutation({
    mutationFn: (caregiverId: number) =>
      unblockCaregiverBySocialWorker(caregiverId),
  });
};

const blockSocialWorkerByCaregiver = async (socialWorkerId: number) => {
  await axiosInstance.post(
    `/caregiver/my/blocked-social-worker/${socialWorkerId}`,
  );
};

export const useBlockSocialWorkerByCaregiver = () => {
  return useMutation({
    mutationFn: (socialWorkerId: number) =>
      blockSocialWorkerByCaregiver(socialWorkerId),
  });
};

const unblockSocialWorkerByCaregiver = async (socialWorkerId: number) => {
  await axiosInstance.delete(
    `/caregiver/my/blocked-social-worker/${socialWorkerId}`,
  );
};

export const useUnblockSocialWorkerByCaregiver = () => {
  return useMutation({
    mutationFn: (socialWorkerId: number) =>
      unblockSocialWorkerByCaregiver(socialWorkerId),
  });
};

export const reportCaregiverChat = async (
  chatRoomId: number,
  payload: ReportRequest,
) => {
  await axiosInstance.post(`/chat/caregiver/${chatRoomId}/report`, {
    reportType: mapReportReasonToApi(payload.reason),
    description: payload.detail ?? '',
  });
};

export const useReportCaregiverChat = () => {
  return useMutation({
    mutationFn: ({
      chatRoomId,
      payload,
    }: {
      chatRoomId: number;
      payload: ReportRequest;
    }) => reportCaregiverChat(chatRoomId, payload),
  });
};

const reportSocialWorkerChat = async (
  chatRoomId: number,
  payload: ReportRequest,
) => {
  await axiosInstance.post(`/chat/social-worker/${chatRoomId}/report`, {
    reportType: mapReportReasonToApi(payload.reason),
    description: payload.detail ?? '',
  });
};

export const useReportSocialWorkerChat = () => {
  return useMutation({
    mutationFn: ({
      chatRoomId,
      payload,
    }: {
      chatRoomId: number;
      payload: ReportRequest;
    }) => reportSocialWorkerChat(chatRoomId, payload),
  });
};
