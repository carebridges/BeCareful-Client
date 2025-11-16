import { axiosInstance } from '@/api/axiosInstance';
import { UploadResult } from '@/hooks/useProfileImageUpload';
import { Presigned } from '@/types/common/image';
import { ElderlyRegisterPayload } from '@/types/Elderly';
import { ElderListResponse } from '@/types/Matching';
import { RecruitmentSearchResponse } from '@/types/Socialworker/matching';

import { useMutation, useQuery } from '@tanstack/react-query';

export const useRegisterElderly = () =>
  useMutation({
    mutationFn: async (payload: ElderlyRegisterPayload) => {
      const { data } = await axiosInstance.post('/elderly', payload);
      return data;
    },
  });

export const useUploadElderlyProfileImage = () =>
  useMutation<UploadResult, Error, { file: File }>({
    mutationFn: async ({ file }) => {
      const { data } = await axiosInstance.post<Presigned>(
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

const createRecruitmentQueryParams = (
  status: '매칭중' | '매칭완료',
  page: number,
  size: number,
) => ({
  elderlyMatchingStatusFilter: status,
  page: Math.max(page - 1, 0),
  size,
});

export const useRecruitment = (
  status: '매칭중' | '매칭완료' | null,
  page: number,
  size: number,
  keyword?: string,
) =>
  useQuery({
    enabled: !!status,
    queryKey: ['recruitment', status, page, size, keyword?.trim() || ''],
    queryFn: async (): Promise<RecruitmentSearchResponse> => {
      const params = createRecruitmentQueryParams(status!, page, size);
      const kw = keyword?.trim();

      if (kw) {
        const { data } = await axiosInstance.post<RecruitmentSearchResponse>(
          '/matching/social-worker/recruitment/search',
          { keyword: kw },
          { params },
        );
        return data;
      }

      const { data } = await axiosInstance.get<RecruitmentSearchResponse>(
        '/matching/social-worker/recruitment',
        { params },
      );
      return data;
    },
  });
