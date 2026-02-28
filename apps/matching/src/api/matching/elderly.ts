import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ElderDetailResponse,
  ElderListResponse,
  ElderlyRegisterPayload,
} from '@/types/elderly';
import {
  axiosInstance,
  PresignedUrlResponse,
  UploadResult,
} from '@repo/common';

export const useRegisterElderly = () =>
  useMutation({
    mutationFn: async (payload: ElderlyRegisterPayload) => {
      const { data } = await axiosInstance.post('/elderly', payload);
      return data;
    },
  });

export const useUpdateElderly = (elderlyId: number) =>
  useMutation({
    mutationFn: async (payload: ElderlyRegisterPayload) => {
      const { data } = await axiosInstance.put(
        `/elderly/${elderlyId}`,
        payload,
      );
      return data;
    },
  });

export const useUploadElderlyProfileImage = () =>
  useMutation<UploadResult, Error, { file: File }>({
    mutationFn: async ({ file }) => {
      const { data } = await axiosInstance.post<PresignedUrlResponse>(
        '/elderly/profile-img/presigned-url',
        null,
        {
          params: {
            fileName: file.name,
            contentType: file.type,
          },
        },
      );

      await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      return {
        tempKey: data.tempKey,
        previewUrl: URL.createObjectURL(file),
      };
    },
  });

export const useElderlyList = (
  page: number,
  size: number = 10,
  keyword?: string,
) =>
  useQuery<ElderListResponse>({
    queryKey: ['elderlyList', page, size, keyword],
    queryFn: async () => {
      const endpoint = keyword ? '/elderly/search' : '/elderly/list';

      const { data } = await axiosInstance.get<ElderListResponse>(endpoint, {
        params: {
          keyword: keyword || undefined,
          page: page - 1,
          size,
          sort: '',
        },
      });

      return data;
    },
  });

export const useElderDetail = (elderlyId: number | null) =>
  useQuery<ElderDetailResponse>({
    queryKey: ['elderlyDetail', elderlyId],
    enabled: !!elderlyId,
    queryFn: async () => {
      const { data } = await axiosInstance.get<ElderDetailResponse>(
        `/elderly/${elderlyId}`,
      );
      return data;
    },
  });

export const useWaitingElderly = (
  page: number,
  size = 10,
  paramStyle: 'page',
  keyword?: string,
) =>
  useQuery({
    queryKey: ['waitingElderly', page, size, keyword?.trim() || '', paramStyle],
    queryFn: async (): Promise<ElderListResponse> => {
      const params =
        paramStyle === 'page'
          ? { page: page - 1, size }
          : { 'pageable.page': page - 1, 'pageable.size': size };

      const kw = keyword?.trim();

      if (kw) {
        const { data } = await axiosInstance.post<ElderListResponse>(
          '/matching/social-worker/elderly/waiting/search',
          { keyword: kw },
          { params },
        );
        return data;
      } else {
        const { data } = await axiosInstance.get<ElderListResponse>(
          '/matching/social-worker/elderly/waiting',
          { params },
        );
        return data;
      }
    },
  });
